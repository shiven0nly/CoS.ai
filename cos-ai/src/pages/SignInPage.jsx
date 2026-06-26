import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { login, register, resetAuthState } from '../features/auth/slices/authSlice';

// ── Floating background orbs (purely decorative) ─────────────────
const BG = () => (
  <>
    <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#5E6AD2]/10 blur-[140px] rounded-full pointer-events-none" />
    <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#A371F7]/10 blur-[140px] rounded-full pointer-events-none" />
  </>
);

// ── Controlled input with icon ────────────────────────────────────
const InputField = ({ id, label, type, icon: Icon, value, onChange, placeholder, rightElement }) => (
  <div>
    <label htmlFor={id} className="block text-sm text-[#8A8A93] mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" aria-hidden="true" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-[#737373] outline-none focus:border-[#5E6AD2]/60 focus:ring-1 focus:ring-[#5E6AD2]/40 transition-all"
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
      )}
    </div>
  </div>
);

export default function SignInPage() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { isLoading, isError, message, isAuthenticated } = useSelector((s) => s.auth);

  const [isRegister, setIsRegister]   = useState(false);
  const [showPass,   setShowPass]     = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  // Redirect once authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
    return () => dispatch(resetAuthState());
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register({ name: form.name, email: form.email, password: form.password }));
    } else {
      dispatch(login({ email: form.email, password: form.password }));
    }
  };

  const toggleMode = () => {
    setIsRegister((p) => !p);
    setForm({ name: '', email: '', password: '' });
    dispatch(resetAuthState());
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex items-center justify-center p-6 font-sans">
      <BG />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#5E6AD2] to-[#A371F7] flex items-center justify-center shadow-[0_0_30px_rgba(94,106,210,0.4)] mb-4">
            <BrainCircuit className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">CoS.ai</h1>
          <p className="text-[#8A8A93] text-sm mt-1">Your AI Chief of Staff</p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl shadow-2xl">
          {/* Inner top glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* Mode toggle */}
          <div className="flex rounded-lg bg-white/5 p-1 mb-8">
            {['Sign In', 'Register'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsRegister(i === 1); dispatch(resetAuthState()); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  isRegister === (i === 1)
                    ? 'bg-linear-to-r from-[#5E6AD2] to-[#A371F7] text-white shadow'
                    : 'text-[#8A8A93] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Error banner */}
          <AnimatePresence>
            {isError && message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <AnimatePresence>
              {isRegister && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <InputField
                    id="name"
                    label="Full Name"
                    type="text"
                    icon={User}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Shiven Sharma"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              id="email"
              label="Email Address"
              type="email"
              icon={Mail}
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
            />

            <InputField
              id="password"
              label="Password"
              type={showPass ? 'text' : 'password'}
              icon={Lock}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="text-[#737373] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-xl bg-linear-to-r from-[#5E6AD2] to-[#A371F7] text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(94,106,210,0.45)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer switch */}
          <p className="mt-6 text-center text-sm text-[#737373]">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={toggleMode} className="text-[#A371F7] hover:text-white font-medium transition-colors">
              {isRegister ? 'Sign in' : 'Register free'}
            </button>
          </p>
        </div>

        {/* Back to landing */}
        <p className="text-center mt-6 text-xs text-[#737373]">
          <Link to="/" className="hover:text-white transition-colors">← Back to home</Link>
        </p>
      </motion.div>
    </div>
  );
}
