import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'HOME', to: '/' },
  { label: 'INFO', to: '/#info' },
  { label: 'LIBRARY', to: '/shop' },
  { label: 'CONTACT', to: '/#contact' }
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="font-serif text-2xl italic text-white">
            FashionLib
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="text-sm font-light tracking-[0.2em] text-white"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="border border-white px-3 py-1 text-xs text-white hover:bg-white hover:text-black"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="border border-white px-3 py-1 text-xs text-white hover:bg-white hover:text-black"
                >
                  REGISTER
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 text-white">
                <span className="text-xs uppercase tracking-[0.2em]">{user?.name}</span>
                <button
                  onClick={logout}
                  className="border border-white px-3 py-1 text-xs hover:bg-white hover:text-black"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 px-8 py-24 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="text-lg font-light tracking-[0.2em] text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <div className="mt-4 flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="border border-white px-4 py-2 text-sm text-white"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="border border-white px-4 py-2 text-sm text-white"
                >
                  REGISTER
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="mt-4 w-fit border border-white px-4 py-2 text-sm text-white"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
