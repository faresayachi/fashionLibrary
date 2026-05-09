import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportById } from '../services/reportService';

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        const response = await getReportById(id);
        setReport(response?.data?.data || null);
      } catch (error) {
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-28">
        <p className="px-6 text-sm uppercase tracking-[0.2em] text-taupe md:px-10">Loading report...</p>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="pt-28">
        <p className="px-6 text-sm text-taupe md:px-10">Report not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-cream-warm pt-24">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[360px_1fr] md:px-10">
        <img
          src={report.coverImage || FALLBACK_COVER}
          alt={report.title}
          className="aspect-[3/4] w-full rounded-2xl object-cover shadow-xl"
        />

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sand">{report.category || 'Report'}</p>
          <h1 className="mt-3 font-serif text-4xl text-charcoal">{report.title}</h1>
          <p className="mt-2 text-sm text-taupe">By {report.author}</p>
          <p className="mt-6 text-base leading-relaxed text-taupe">
            {report.description || 'No description available for this report yet.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-charcoal">
            <span className="border border-charcoal/15 px-3 py-1">{report.season || 'Seasonal'}</span>
            <span className="border border-charcoal/15 px-3 py-1">{report.pages || '--'} pages</span>
          </div>
          <p className="mt-8 text-2xl font-semibold text-gold">€{report.price}</p>
          <button className="mt-6 bg-sand px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-sand-dark">
            Purchase Report
          </button>
        </div>
      </section>
    </main>
  );
}
