import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await registerRequest(formData);
      navigate('/login');
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-cream-warm px-6 pt-24">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-sand">Create Account</p>
        <h1 className="mt-3 font-serif text-3xl text-charcoal">Register</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={onChange}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChange}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={onChange}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-700">{errorMsg}</p>}

          <button
            disabled={isSubmitting}
            className="w-full bg-sand px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-sand-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="mt-5 text-sm text-taupe">
          Already have an account?{' '}
          <Link to="/login" className="text-sand hover:text-sand-dark">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
