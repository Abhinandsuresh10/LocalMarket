import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate()

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.header 
      className="bg-white shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-linear-to-r from-green-500 to-purple-600 rounded-full"></div>
            <motion.h1 
              className="text-2xl font-bold text-green-600"
              whileHover={{ color: '#8b5cf6' }}
              transition={{ duration: 0.3 }}
            >
              <span className='italic text-sm'>LM~</span>
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
           
            
            <motion.button
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-300"
              whileHover={{ scale: 1.05, color: '#8b5cf6' }}
              onClick={() => navigate('/profile')}
            >
              <User size={14} />
              <span className='italic text-sm'>Profile</span>
            </motion.button>
            
            <motion.button
              className="bg-green-500 text-white px-6 py-2 rounded-full italic text-sm hover:bg-purple-600 transition-colors duration-300"
              whileHover={{ backgroundColor: '#8b5cf6' }}
              onClick={() => navigate('/sell')}
            >
              Sell Now
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                
                <button className="flex items-center space-x-2 py-2 text-gray-700 hover:text-purple-600"
                onClick={() => navigate('/profile')}
                    >
                  <User size={14} />
                  <span className='italic text-sm'>Profile</span>
                </button>
                <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-purple-600 italic text-sm">
                  Sell Now
                </button>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;