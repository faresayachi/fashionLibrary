import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteReport, getReports } from '../../services/reportService';

export default function AdminPanel() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReports = async () => {
    setLoading(true);
    try {
      const response = await getReports();
      const list = response?.data?.data?.reports || response?.data?.data || [];
      setReports(Array.isArray(list) ? list : []);
    } catch (error) {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const onDelete = async (id) => {
    const ok = window.confirm('Delete this report?');
    if (!ok) return;

    try {
      await deleteReport(id);
      await loadReports();
    } catch (error) {}
  };

  return (
    <main className="bg-cream-warm pt-24">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sand">Admin</p>
            <h1 className="mt-2 font-serif text-4xl text-charcoal">Report Manager</h1>
          </div>
          <Link
            to="/admin/reports/new"
            className="bg-sand px-5 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-sand-dark"
          >
            Create Report
          </Link>
        </div>

        {loading ? (
          <p className="text-sm uppercase tracking-[0.2em] text-taupe">Loading reports...</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-charcoal text-cream">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Season</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="border-t border-charcoal/10">
                    <td className="px-4 py-3">{report.title}</td>
                    <td className="px-4 py-3">{report.category}</td>
                    <td className="px-4 py-3">{report.season}</td>
                    <td className="px-4 py-3 text-gold">€{report.price}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/reports/${report._id}/edit`}
                          className="border border-charcoal/25 px-3 py-1 text-xs uppercase tracking-[0.12em] hover:bg-charcoal hover:text-white"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => onDelete(report._id)}
                          className="bg-red-800 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white hover:bg-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reports.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-taupe">
                      No reports available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
