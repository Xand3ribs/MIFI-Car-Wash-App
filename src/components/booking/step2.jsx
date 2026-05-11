import { useState, useEffect, useMemo, useRef } from 'react';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to move the map view
function ChangeView({ center }) {
  const map = useMap();
  map.flyTo(center, 15); // 15 is the zoom level
  return null;
}

function Step2({ address, setAddress }) {
 
  const [manualDetails, setManualDetails] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const markerRef = useRef(null);

  // Default map position (e.g., London) until user selects something
  const [coords, setCoords] = useState([6.5244, 3.3792]);

  const LIQ_TOKEN = 'pk.d07bb9c386d6f7c5d13a9d09ebcd5957';

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          const lat = newPos.lat;
          const lon = newPos.lng;

          // 1. Update the math (the coordinates)
          setCoords([lat, lon]);

          // 2. Update the text (the input field)
          try {
            const response = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=${LIQ_TOKEN}&lat=${lat}&lon=${lon}&format=json`
            );
            const data = await response.json();

            if (data && data.display_name) {
              setAddress(data.display_name);
              setHasSelected(true); // Prevents the search suggestions from popping back up
            }
          } catch (error) {
            console.error('Error reverse geocoding:', error);
          }
        }
      },
    }),
    [LIQ_TOKEN]
  ); // Added LIQ_TOKEN as a dependency

  useEffect(() => {
    if (address.length < 3 || hasSelected) {
      setSuggestions([]);
      return;
    }

    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=${LIQ_TOKEN}&q=${address}&countrycodes=ng&format=json`
        );
        const data = await response.json();

        // LocationIQ returns an array of objects
        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Wait 300ms after user stops typing to call API
    const timeoutId = setTimeout(fetchAddresses, 300);
    return () => clearTimeout(timeoutId);
  }, [address, hasSelected]);

  return (
    <div className="flex flex-col gap-10">
      <div className="mb-8 lg:mb-10">
        <h1 className="text-[2rem] lg:text-[3rem] text-white">
          Where should we go ?
        </h1>

        <p className="text-lg text-text-secondary  mt-2">
          We'll come to you, just tell us where you are
        </p>
      </div>

      {/* Location Input and map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Location Input */}
        <div className="flex flex-col gap-10">
          {/* street input */}
          <div className="relative [&_label]:w-full [&_.input]:w-full">
            <label className="block text-white text-sm mb-2 font-medium">
              Enter your street name
            </label>

            <label className="input flex items-center gap-2 bg-gray-dark rounded-2xl p-4 text-white border border-border-dark">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>

              <input
                className="w-full"
                type="search"
                required
                placeholder="Enter your street name..."
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setHasSelected(false); // User is typing again, reset flag
                }}
              />
            </label>

            {/* Floating Results List */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-gray-dark border border-border-dark rounded-2xl shadow-2xl">
                <ul className="py-2">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        const newCoords = [
                          parseFloat(item.lat),
                          parseFloat(item.lon),
                        ];
                        setAddress(item.display_name);
                        setCoords(newCoords); // Update map coordinates
                        setHasSelected(true);
                        setSuggestions([]);
                      }}
                      className="px-5 py-3 hover:bg-blue-action hover:text-navy-deep cursor-pointer transition-colors text-white text-sm"
                    >
                      <span className="font-bold block">
                        {item.display_place}
                      </span>
                      <span className="opacity-70 text-xs">
                        {item.display_address}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* additional details */}
          <div className="mt-10">
            <label className="text-white text-sm mb-2 block font-medium">
              House Number / Building Details
            </label>

            <input
              type="text"
              className="w-full bg-gray-dark border border-border-dark rounded-2xl p-4 text-white focus:border-blue-action outline-none"
              placeholder="e.g. No 337, White building with black gate"
              value={manualDetails}
              onChange={(e) => setManualDetails(e.target.value)}
            />

            <p className="text-[10px] text-white/50 mt-2 italic">
              Tip: You can drag the map pin to your exact gate!
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="z-10 w-full h-[450px] rounded-3xl overflow-hidden border border-border-dark bg-gray-dark">
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
