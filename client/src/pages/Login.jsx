import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || 'Invalid credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-cream-warm px-6 pt-24">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-sand">Welcome Back</p>
        <h1 className="mt-3 font-serif text-3xl text-charcoal">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-taupe">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full border border-charcoal/15 px-3 py-2 text-sm outline-none focus:border-sand"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-700">{errorMsg}</p>}

          <button
            disabled={isSubmitting}
            className="w-full bg-sand px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-sand-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-sm text-taupe">
          No account?{' '}
          <Link to="/register" className="text-sand hover:text-sand-dark">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
