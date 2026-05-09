import { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard';
import { getReports } from '../services/reportService';

const categories = ['All', 'Trend Reports', 'Runway Analysis', 'Brand Insights', 'Retail Data'];

export default function Shop() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const response = await getReports(params);
        const list = response?.data?.data?.reports || response?.data?.data || [];
        setReports(Array.isArray(list) ? list : []);
      } catch (error) {
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [search, category]);

  return (
    <main className="bg-cream-warm pt-24">
      <section className="bg-charcoal px-6 py-14 text-cream md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.2em] text-sand">FashionLib</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">The Library</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[260px_1fr] md:px-10">
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl text-charcoal">Filters</h2>
          <div className="mt-5">
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, author..."
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>
          <div className="mt-5">
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </aside>

        <div>
          {loading ? (
            <p className="text-sm uppercase tracking-[0.2em] text-taupe">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-sm text-taupe">No reports found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {reports.map((report) => (
                <ReportCard key={report._id} report={report} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
