import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReportById, updateReport } from '../../services/reportService';

export default function EditReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    season: '',
    price: '',
    pages: '',
    publishedAt: '',
    fileUrl: '',
    coverImage: null
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await getReportById(id);
        const report = response?.data?.data;
        if (report) {
          setForm((prev) => ({
            ...prev,
            title: report.title || '',
            author: report.author || '',
            description: report.description || '',
            category: report.category || '',
            season: report.season || '',
            price: report.price ?? '',
            pages: report.pages ?? '',
            publishedAt: report.publishedAt ? String(report.publishedAt).slice(0, 10) : '',
            fileUrl: report.fileUrl || ''
          }));
        }
      } catch (error) {
        setErrorMsg('Failed to load report.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const onChange = (event) => {
    const { name, value, files } = event.target;
    setForm((prev) => ({ ...prev, [name]: files && files.length > 0 ? files[0] : value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') payload.append(key, value);
      });

      await updateReport(id, payload);
      navigate('/admin');
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || 'Failed to update report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="pt-28">
        <p className="px-6 text-sm uppercase tracking-[0.2em] text-taupe md:px-10">Loading report...</p>
      </main>
    );
  }

  return (
    <main className="bg-cream-warm pt-24">
      <section className="mx-auto max-w-3xl px-6 py-12 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-sand">Admin</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal">Edit Report</h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          {[
            ['title', 'Title'],
            ['author', 'Author'],
            ['category', 'Category'],
            ['season', 'Season'],
            ['fileUrl', 'PDF URL'],
            ['price', 'Price'],
            ['pages', 'Pages'],
            ['publishedAt', 'Published At (YYYY-MM-DD)']
          ].map(([name, label]) => (
            <div key={name}>
              <label className="text-xs uppercase tracking-[0.2em] text-taupe">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={onChange}
                className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
              />
            </div>
          ))}

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows="4"
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Replace Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={onChange}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-700">{errorMsg}</p>}

          <button
            disabled={isSubmitting}
            className="bg-sand px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-sand-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </section>
    </main>
  );
}
