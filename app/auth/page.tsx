'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function AuthPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Sign in successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Sign up successful! Please check your email for a confirmation link.');
        setEmail('');
        setPassword('');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right bottom, #f0f4ff, #ffffff)' }}>
      {/* Header with TJZ branding */}
      <Link href="/" className="mb-12">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <div className="text-2xl font-bold" style={{ color: '#0066cc' }}>TJZ</div>
          <div className="text-lg font-semibold text-gray-800">Transports</div>
        </div>
      </Link>

      {/* Auth card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-100">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setIsSigningIn(true);
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-3 font-semibold transition ${
              isSigningIn
                ? 'text-gray-900 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={isSigningIn ? { borderBottomColor: '#0066cc', color: '#0066cc' } : {}}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsSigningIn(false);
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-3 font-semibold transition ${
              !isSigningIn
                ? 'text-gray-900 border-b-2'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={!isSigningIn ? { borderBottomColor: '#0066cc', color: '#0066cc' } : {}}
          >
            Sign Up
          </button>
        </div>

        {/* Title */}
        <div className="pt-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSigningIn ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isSigningIn ? 'Sign in to your CRM dashboard' : 'Set up your TJZ admin account'}
          </p>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="border-gray-300"
              style={{ borderColor: '#e5e7eb' }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="border-gray-300"
              style={{ borderColor: '#e5e7eb' }}
            />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={isSigningIn ? handleSignIn : handleSignUp}
          disabled={isLoading || !email || !password}
          className="w-full text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: isLoading || !email || !password ? '#ccc' : '#0066cc',
          }}
          onMouseEnter={(e) => {
            if (!isLoading && email && password) {
              e.currentTarget.style.backgroundColor = '#0052a3';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && email && password) {
              e.currentTarget.style.backgroundColor = '#0066cc';
            }
          }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {isSigningIn ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            <span>{isSigningIn ? 'Sign In' : 'Create Account'}</span>
          )}
        </button>

        {/* Footer text */}
        <div className="text-center text-sm text-gray-600 pt-4">
          {isSigningIn ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setIsSigningIn(false)}
                className="font-semibold hover:underline transition"
                style={{ color: '#0066cc' }}
              >
                Sign up here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsSigningIn(true)}
                className="font-semibold hover:underline transition"
                style={{ color: '#0066cc' }}
              >
                Sign in here
              </button>
            </>
          )}
        </div>

        {/* Back to home */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
