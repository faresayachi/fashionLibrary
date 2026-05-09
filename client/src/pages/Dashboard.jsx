import { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard';
import { getMyLibrary } from '../services/reportService';

export default function Dashboard() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLibrary = async () => {
      setLoading(true);
      try {
        const response = await getMyLibrary();
        const list = response?.data?.data || [];
        setLibrary(Array.isArray(list) ? list : []);
      } catch (error) {
        setLibrary([]);
      } finally {
        setLoading(false);
      }
    };

    loadLibrary();
  }, []);

  return (
    <main className="bg-cream-warm pt-24">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-sand">Private</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal">My Library</h1>

        {loading ? (
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-taupe">Loading library...</p>
        ) : library.length === 0 ? (
          <p className="mt-6 text-sm text-taupe">No purchased reports found yet.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {library.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
