import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Lock, Sprout, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(76,175,80,0.15),transparent_50%)]"></div>

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
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-[#94a3b8]">Join the smart farming revolution</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">User Role</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CAF50]" />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all appearance-none"
                >
                  <option value="admin" className="bg-[#1E293B]">Admin</option>
                  <option value="technician" className="bg-[#1E293B]">Technician</option>
                  <option value="viewer" className="bg-[#1E293B]">Viewer</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white rounded-xl py-3.5 font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] transition-all duration-200 mt-6"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-[#94a3b8] mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#4CAF50] hover:text-[#22C55E] font-semibold transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
