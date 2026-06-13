import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UserCircle2 } from 'lucide-react';
import mifaiLogo from '../assets/mifai-logo.png';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
    // className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_2px_24px_rgba(13,27,42,0.08)] border-b border-white/60"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_24px_rgba(13,27,42,0.08)] border-b border-white/60'
          : 'bg-transparent'
        }
      `}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={mifaiLogo}
              alt="MiFai Wash"
              className="h-10 lg:h-14 w-auto transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop nav (optional placeholder) */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Services', 'How It Works', 'Pricing'].map((item) => (
              <Link
                key={item}
                to="/"
                className={`text-sm font-medium tracking-wide transition-colors duration-200
                  ${scrolled ? 'text-[#0D1B2A] hover:text-[#1565C0]' : 'text-white/90 hover:text-white'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">

            <Link
              to="/login"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-[#1565C0] text-white
                shadow-[0_4px_14px_rgba(21,101,192,0.4)] hover:bg-[#1251A3]
                hover:shadow-[0_4px_20px_rgba(21,101,192,0.55)]
                hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-200"
            >
              Log In
            </Link>

          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">

            <Link
              to="/login"
              className={`p-2 rounded-xl transition-colors duration-200
                ${scrolled ? 'text-[#0D1B2A] hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Log In"
            >
              <UserCircle2 size={24} strokeWidth={1.75} />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-xl transition-colors duration-200
                ${scrolled ? 'text-[#0D1B2A] hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 pt-2 pb-4 space-y-1">
          {['Services', 'How It Works', 'Pricing'].map((item) => (
            <Link
              key={item}
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-[#0D1B2A] px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {item}
            </Link>
          ))}
          
        </div>
      </div>
    </header>
  );
}

export default Header;