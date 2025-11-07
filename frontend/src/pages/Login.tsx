import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants:Variants  = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring"
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-purple-50 flex items-center justify-center p-4 text-sm italic">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 text-6xl opacity-10"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍅
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 text-4xl opacity-10"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🥕
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-5xl opacity-10"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🥬
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
         

          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
            whileHover={{ color: '#16a34a' }}
          >
            Welcome Back
          </motion.h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between"
            >
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              variants={itemVariants}
              className="w-full bg-linear-to-r from-green-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              
            >
              Sign In
            </motion.button>

            {/* Divider */}
            <motion.div 
              variants={itemVariants}
              className="relative flex items-center justify-center"
            >
            </motion.div>


            {/* Sign Up Link */}
            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-gray-600">
                Don't have an account?{' '}
                <motion.a
                  href="/register"
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign up
                </motion.a>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mt-8 text-center"
        >
          {[
            { icon: '🔒', text: 'Secure' },
            { icon: '🚀', text: 'Fast' },
            { icon: '🌱', text: 'Local' }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className="bg-white rounded-xl p-3 shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <p className="text-xs text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;