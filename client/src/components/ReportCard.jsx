import { Link } from 'react-router-dom';
import { getAssetUrl } from '../services/axiosInstance';

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop';

export default function ReportCard({ report }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-charcoal/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative aspect-[3/4]">
        <img
          src={getAssetUrl(report?.coverImage) || FALLBACK_COVER}
          alt={report?.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-sand">{report?.category || 'Report'}</p>
          <h3 className="mt-1 font-serif text-xl text-white">{report?.title}</h3>
          <div className="mt-2 flex items-center justify-between text-sm text-white/90">
            <span>{report?.season || 'Seasonal'}</span>
            <span className="font-semibold text-gold">€{report?.price ?? '--'}</span>
          </div>

          <Link
            to={`/reports/${report?._id}`}
            className="mt-4 inline-block border border-white/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:text-black"
          >
            View Report
          </Link>
        </div>
      </div>
    </article>
  );
}
