import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <h3 className="font-serif text-3xl italic">FashionLib</h3>
          <p className="mt-4 text-sm text-cream/70">
            The digital destination for premium fashion intelligence reports.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-sand">Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Library</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-sand">Social</h4>
          <div className="mt-4 flex gap-3 text-sm">
            <span className="border border-cream/30 px-3 py-1">IG</span>
            <span className="border border-cream/30 px-3 py-1">X</span>
            <span className="border border-cream/30 px-3 py-1">LI</span>
          </div>
        </div>
      </div>
      <p className="border-t border-cream/10 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} FashionLib. All rights reserved.
      </p>
    </footer>
  );
}
