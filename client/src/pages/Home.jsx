import { Link } from 'react-router-dom';
import ReportCard from '../components/ReportCard';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1692014957131-d0d992bf47ae?q=80&w=1920&auto=format&fit=crop';

const featured = [
  {
    _id: 'f1',
    title: 'Global Trend Forecast SS25',
    category: 'Trend Reports',
    season: 'SS25',
    price: 89,
    coverImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'f2',
    title: 'Luxury Brand Heatmap 2026',
    category: 'Brand Insights',
    season: 'FW25',
    price: 110,
    coverImage:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'f3',
    title: 'Runway Color Intelligence',
    category: 'Runway Analysis',
    season: 'FW24',
    price: 74,
    coverImage:
      'https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function Home() {
  return (
    <main>
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-sand">Spring Editorial Drop</p>
          <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight md:text-7xl">
            Fashion Intelligence, Curated for Decision Makers.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            Discover premium runway analysis, trend forecasting, and strategic brand reports in one
            elegant digital library.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="bg-sand px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-sand-dark"
            >
              Browse Library
            </Link>
            <a
              href="#info"
              className="border border-sand px-6 py-3 text-xs uppercase tracking-[0.2em] text-sand hover:bg-sand hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-10 text-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4 md:px-10">
          <div><p className="text-3xl font-semibold text-sand">120+</p><p className="text-xs uppercase tracking-[0.2em]">Reports</p></div>
          <div><p className="text-3xl font-semibold text-sand">30+</p><p className="text-xs uppercase tracking-[0.2em]">Brands</p></div>
          <div><p className="text-3xl font-semibold text-sand">15</p><p className="text-xs uppercase tracking-[0.2em]">Categories</p></div>
          <div><p className="text-3xl font-semibold text-sand">25k</p><p className="text-xs uppercase tracking-[0.2em]">Readers</p></div>
        </div>
      </section>

      <section id="info" className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">Featured Reports</h2>
            <Link to="/shop" className="text-xs uppercase tracking-[0.2em] text-sand">
              View All
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
