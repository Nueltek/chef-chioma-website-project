'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        router.push('/admin');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm text-sm">
          Invalid credentials. Please try again.
        </div>
      )}

      <div>
        <label className="block font-sans text-xs uppercase tracking-widest text-cream/70 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-earth-800 border border-earth-700 rounded-sm text-cream font-body focus:outline-none focus:border-copper transition-colors"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label className="block font-sans text-xs uppercase tracking-widest text-cream/70 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-earth-800 border border-earth-700 rounded-sm text-cream font-body focus:outline-none focus:border-copper transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-copper text-cream font-sans text-sm uppercase tracking-widest border border-copper hover:bg-transparent hover:text-copper transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}

function LoginFallback() {
  return (
    <div className="space-y-6">
      <div className="h-16 bg-earth-800 animate-pulse rounded-sm" />
      <div className="h-16 bg-earth-800 animate-pulse rounded-sm" />
      <div className="h-14 bg-earth-800 animate-pulse rounded-sm" />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-earth-900 flex items-center justify-center px-6">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="text-center mb-4">
            <span className="font-script text-4xl text-copper-light leading-none block">Chioma</span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-[1px] w-6 bg-cream/40" />
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-cream/60">Private Chef</span>
              <div className="h-[1px] w-6 bg-cream/40" />
            </div>
          </Link>
          <p className="font-body text-cream/50 text-sm mt-2">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-earth-800/50 border border-earth-700 rounded-sm p-8">
          <h1 className="font-display text-2xl text-cream text-center mb-8">
            Welcome Back
          </h1>

          <Suspense fallback={<LoginFallback />}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Back to site */}
        <p className="text-center mt-8">
          <Link href="/" className="font-body text-cream/50 hover:text-cream transition-colors text-sm">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
