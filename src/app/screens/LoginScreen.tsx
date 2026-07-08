import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Fingerprint, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(76,175,80,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#1E293B]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#22C55E] rounded-2xl mb-4 shadow-lg shadow-green-500/50">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-[#94a3b8]">Sign in to your smart farm</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#4CAF50] focus:ring-[#4CAF50]" />
                <span className="text-[#94a3b8]">Remember me</span>
              </label>
              <button type="button" className="text-[#4CAF50] hover:text-[#22C55E] transition-colors">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white rounded-xl py-3.5 font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] transition-all duration-200"
            >
              Sign In
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1E293B] text-[#94a3b8]">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3.5 font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-5 h-5 text-[#06B6D4]" />
              Biometric Login
            </button>
          </form>

          <p className="text-center text-[#94a3b8] mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#4CAF50] hover:text-[#22C55E] font-semibold transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
