import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle2 } from 'lucide-react';
import mifaiLogo from '../assets/mifai-logo.png';

const NAV_ITEMS = [
  { label: 'Services', anchor: 'services' },
  { label: 'How It Works', anchor: 'how-it-works' },
  { label: 'Contact Us', anchor: 'contact-us' },
];

function Header({ sectionRefs }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState('');

  const scrollToAnchor = (anchor) => {
    const el =
      sectionRefs?.[anchor]?.current || document.getElementById(anchor);
    if (!el) return false;

    const headerH = document.querySelector('header')?.offsetHeight ?? 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  };

  const isHomeRoute = () => {
    return (
      location.pathname === '/' &&
      (location.hash === '' || location.hash === '#' || location.hash === '#/')
    );
  };

  const handleNavClick = (anchor) => {
    setMenuOpen(false);
    if (!isHomeRoute()) {
      navigate('/', { state: { scrollTo: anchor } });
      return;
    }

    if (!scrollToAnchor(anchor)) {
      navigate('/', { state: { scrollTo: anchor } });
    }
  };

  // ── Glass effect on scroll ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Continuous Active Section Tracking ──
  useEffect(() => {
    if (!sectionRefs) return;
    const observers = [];

    NAV_ITEMS.forEach(({ anchor }) => {
      const el = sectionRefs[anchor]?.current;
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveAnchor(anchor);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionRefs]);

  useEffect(() => {
    const anchor = location.state?.scrollTo;
    if (!anchor) return;

    const timeout = setTimeout(() => {
      scrollToAnchor(anchor);
    }, 50);

    return () => clearTimeout(timeout);
  }, [location.state?.scrollTo, sectionRefs]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-[#0D1B2A]/90 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.3)] border-b border-white/8' : 'bg-transparent'}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={mifaiLogo}
              alt="MiFai Wash"
              className="h-10 lg:h-14 w-auto transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ label, anchor }) => {
              const isActive = activeAnchor === anchor;
              return (
                <button
                  key={anchor}
                  onClick={() => handleNavClick(anchor)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#1565C0] transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-[#1565C0] text-white shadow-[0_4px_14px_rgba(21,101,192,0.4)] hover:bg-[#1251A3] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Log In
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/login"
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/8 transition-colors duration-200"
            >
              <UserCircle2 size={24} strokeWidth={1.75} />
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/8 transition-colors duration-200"
            >
              {menuOpen ? (
                <X size={24} strokeWidth={1.75} />
              ) : (
                <Menu size={24} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-[#0D1B2A]/95 backdrop-blur-xl border-t border-white/8 px-4 pt-2 pb-4 space-y-1">
          {NAV_ITEMS.map(({ label, anchor }) => (
            <button
              key={anchor}
              onClick={() => handleNavClick(anchor)}
              className={`block w-full text-left text-sm font-medium px-3 py-2.5 rounded-xl transition-colors duration-150
                ${activeAnchor === anchor ? 'text-white bg-white/8' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/8 mt-2">
            <Link
              to="/booking"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-sm font-semibold text-white bg-[#1565C0] px-4 py-3 rounded-xl shadow-[0_4px_14px_rgba(21,101,192,0.35)] hover:bg-[#1251A3] transition-colors duration-200"
            >
              Book a Wash
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
