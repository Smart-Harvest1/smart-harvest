import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sprout, Sun, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.1),transparent_50%)]"></div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sun className="w-16 h-16 text-[#FFC107]" />
              <div className="absolute inset-0 bg-[#FFC107] blur-2xl opacity-50 rounded-full"></div>
            </motion.div>
            <Sprout className="w-20 h-20 text-[#4CAF50]" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-14 h-14 text-[#06B6D4]" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Smart Tech<br />Smarter Crops
          </h1>

          <p className="text-[#94a3b8] text-lg max-w-md mx-auto leading-relaxed">
            Powering Sustainable Agriculture Through Smart Innovation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 bg-[#4CAF50] rounded-full"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-[#FFC107] rounded-full"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-[#06B6D4] rounded-full"
          ></motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="rgba(76, 175, 80, 0.1)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
