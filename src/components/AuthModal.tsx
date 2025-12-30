import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password' | 'reset-sent';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (authView === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        onAuthSuccess();
        handleClose();
      } else if (authView === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              phone,
            },
          },
        });

        if (signUpError) throw signUpError;

        setSuccessMessage('Account created successfully! You can now sign in.');
        setTimeout(() => {
          setAuthView('login');
          setSuccessMessage('');
        }, 2000);
      } else if (authView === 'forgot-password') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (resetError) throw resetError;

        setAuthView('reset-sent');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setAuthView('login');
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setError('');
      setSuccessMessage('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {authView !== 'login' && authView !== 'reset-sent' && (
              <button
                onClick={() => {
                  setAuthView('login');
                  setError('');
                  setSuccessMessage('');
                }}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}

            {authView === 'reset-sent' ? (
              <div className="text-center py-8">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Check Your Email
                </h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Click the link in the email to reset your password. If you don't see it, check your spam folder.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAuthView('login');
                    setEmail('');
                  }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Login
                </motion.button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {authView === 'login' && 'Welcome Back'}
                    {authView === 'signup' && 'Create Account'}
                    {authView === 'forgot-password' && 'Reset Password'}
                  </h2>
                  <p className="text-gray-600">
                    {authView === 'login' && 'Sign in to access your assessments'}
                    {authView === 'signup' && 'Sign up to save and manage your projects'}
                    {authView === 'forgot-password' && 'Enter your email to receive a password reset link'}
                  </p>
                </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authView === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {authView !== 'forgot-password' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              {authView === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setAuthView('forgot-password')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' :
                  authView === 'login' ? 'Sign In' :
                  authView === 'signup' ? 'Create Account' :
                  'Send Reset Link'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              {authView === 'login' && (
                <button
                  onClick={() => {
                    setAuthView('signup');
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Don't have an account? Sign Up
                </button>
              )}
              {authView === 'signup' && (
                <button
                  onClick={() => {
                    setAuthView('login');
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Already have an account? Sign In
                </button>
              )}
            </div>
            </>
            )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
