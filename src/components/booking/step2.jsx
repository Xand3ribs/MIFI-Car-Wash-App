import { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, Info } from 'lucide-react';

// Fix for default marker icons in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper: smoothly re-centre the map when coordinates change
function ChangeView({ center }) {
  const map = useMap();
  map.flyTo(center, 15);
  return null;
}

const LIQ_TOKEN = 'pk.d07bb9c386d6f7c5d13a9d09ebcd5957';

// ─────────────────────────────────────────────────────────────────────────────
function Step2({ address, setAddress }) {
  const [manualDetails, setManualDetails] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [coords, setCoords] = useState([6.5244, 3.3792]); // Lagos default
  const markerRef = useRef(null);

  // Drag-end: reverse-geocode the new pin position back to a display name
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (!marker) return;

        const { lat, lng } = marker.getLatLng();
        setCoords([lat, lng]);

        try {
          const res = await fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=${LIQ_TOKEN}&lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          if (data?.display_name) {
            setAddress(data.display_name);
            setHasSelected(true);
          }
        } catch (err) {
          console.error('Reverse geocoding error:', err);
        }
      },
    }),
    []
  );

  // Autocomplete: debounced fetch on address text changes
  useEffect(() => {
    if (address.length < 3 || hasSelected) {
      setSuggestions([]);
      return;
    }

    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=${LIQ_TOKEN}&q=${address}&countrycodes=ng&format=json`
        );
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Autocomplete error:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchAddresses, 300);
    return () => clearTimeout(timeout);
  }, [address, hasSelected]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Page heading */}
      <div>
        <h1 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-tight">
          Where should we go?
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          We'll come to you — just tell us where you are
        </p>
      </div>

      {/* Two-column layout: inputs left, map right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Left: search + manual detail ─────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Search input */}
          <div>
            <label
              className="flex items-center gap-2 text-sm font-semibold text-white/60
              uppercase tracking-widest mb-2"
            >
              <Search size={13} />
              Street Address
            </label>

            <div className="relative">
              <label
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl
                  bg-gray-dark border border-border-dark text-white
                  focus-within:border-blue-action/70 transition-colors duration-200"
              >
                <Search size={16} className="text-white/40 shrink-0" />
                <input
                  type="search"
                  required
                  placeholder="e.g. 15 Admiralty Way, Lekki..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setHasSelected(false);
                  }}
                  className="flex-1 bg-transparent outline-none text-white
                    placeholder:text-white/25 text-base"
                />
                {loading && (
                  <div
                    className="w-4 h-4 border-2 border-blue-action/40 border-t-blue-action
                    rounded-full animate-spin shrink-0"
                  />
                )}
              </label>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <div
                  className="absolute z-50 w-full mt-2 bg-gray-dark border border-border-dark
                  rounded-2xl shadow-2xl overflow-hidden"
                >
                  <ul>
                    {suggestions.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          setAddress(item.display_name);
                          setCoords([
                            parseFloat(item.lat),
                            parseFloat(item.lon),
                          ]);
                          setHasSelected(true);
                          setSuggestions([]);
                        }}
                        className="flex items-start gap-3 px-4 py-3 cursor-pointer
                          hover:bg-blue-action/10 hover:text-white
                          border-b border-border-dark last:border-0
                          text-white transition-colors duration-150"
                      >
                        <MapPin
                          size={14}
                          className="text-blue-action shrink-0 mt-0.5"
                        />
                        <div>
                          <span className="block font-semibold text-sm">
                            {item.display_place}
                          </span>
                          <span className="block text-xs text-white/40">
                            {item.display_address}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Manual detail input */}
          <div>
            <label
              className="flex items-center gap-2 text-sm font-semibold text-white/60
              uppercase tracking-widest mb-2"
            >
              <MapPin size={13} />
              Building Details
            </label>
            <textarea
              rows={3}
              placeholder="e.g. No. 337 — white building with a black gate"
              value={manualDetails}
              onChange={(e) => setManualDetails(e.target.value)}
              className="w-full bg-gray-dark border border-border-dark rounded-2xl px-4 py-3.5
                text-white placeholder:text-white/25 text-base
                focus:border-blue-action/70 outline-none resize-none
                transition-colors duration-200"
            />
          </div>

          {/* Drag tip */}
          <div
            className="flex items-start gap-2.5 px-4 py-3 rounded-2xl
            bg-blue-action/8 border border-blue-action/20"
          >
            <Info size={14} className="text-blue-action mt-0.5 shrink-0" />
            <p className="text-xs text-white/50 leading-relaxed">
              <span className="text-blue-action font-semibold">Pro tip:</span>{' '}
              Drag the map pin to your exact gate for perfect accuracy.
            </p>
          </div>

          {/* Confirmed address badge */}
          {hasSelected && address && (
            <div
              className="flex items-start gap-3 px-4 py-3.5 rounded-2xl
              bg-green-500/10 border border-green-500/25
              transition-all duration-300 ease-out translate-y-0 opacity-100"
            >
              <MapPin size={15} className="text-green-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-0.5">
                  Location confirmed
                </p>
                <p className="text-sm text-white/60 leading-snug">{address}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Leaflet map ────────────────────────────────────────── */}
        <div
          className="relative z-10 w-full h-[420px] lg:h-auto rounded-3xl overflow-hidden
          border border-border-dark shadow-[0_0_40px_rgba(0,0,0,0.4)]"
        >
          <MapContainer
            center={coords}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <ChangeView center={coords} />
            <TileLayer
              url={`https://tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LIQ_TOKEN}&theme=dark`}
              attribution="&copy; LocationIQ"
            />
            <Marker
              position={coords}
              draggable={true}
              eventHandlers={eventHandlers}
              ref={markerRef}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Step2;
