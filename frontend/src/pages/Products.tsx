import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Calendar,
  Filter,
  Search,
  ShoppingBag
} from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState('latest');
  const navigate = useNavigate()

  // Products data
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      description: "Fresh from my backyard garden, grown without pesticides. Perfect for salads and sauces.",
      price: "$2.50",
      originalPrice: "$3.00",
      expiry: "5 days",
      location: "1.2km away",
      rating: 4.8,
      reviewCount: 24,
      seller: "Sarah's Garden",
      image: "🍅",
      category: "Vegetables",
      isFresh: true
    },
    {
      id: 2,
      name: "Homegrown Carrots",
      description: "Sweet and crunchy carrots harvested this morning. Great for snacking or cooking.",
      price: "$3.00",
      originalPrice: "$3.50",
      expiry: "7 days",
      location: "0.8km away",
      rating: 4.9,
      reviewCount: 18,
      seller: "Mike's Farm",
      image: "🥕",
      category: "Vegetables",
      isFresh: true
    },
    {
      id: 3,
      name: "Fresh Lettuce Bundle",
      description: "Crisp and green lettuce, perfect for fresh salads and sandwiches.",
      price: "$1.75",
      originalPrice: "$2.25",
      expiry: "3 days",
      location: "1.5km away",
      rating: 4.7,
      reviewCount: 15,
      seller: "Green Thumb Gardens",
      image: "🥬",
      category: "Leafy Greens",
      isFresh: true
    },
    {
      id: 4,
      name: "Sweet Bell Peppers",
      description: "Colorful bell peppers in red, yellow, and green. Sweet and crunchy.",
      price: "$4.25",
      originalPrice: "$5.00",
      expiry: "6 days",
      location: "2.1km away",
      rating: 4.6,
      reviewCount: 32,
      seller: "Pepper Paradise",
      image: "🫑",
      category: "Vegetables",
      isFresh: true
    },
    {
      id: 5,
      name: "Organic Cucumbers",
      description: "Fresh organic cucumbers, perfect for salads or as a healthy snack.",
      price: "$2.75",
      originalPrice: "$3.25",
      expiry: "4 days",
      location: "1.8km away",
      rating: 4.5,
      reviewCount: 21,
      seller: "Cucumber Corner",
      image: "🥒",
      category: "Vegetables",
      isFresh: true
    },
    {
      id: 6,
      name: "Fresh Basil Leaves",
      description: "Aromatic basil leaves perfect for pesto, pasta, and Italian dishes.",
      price: "$1.50",
      originalPrice: "$2.00",
      expiry: "2 days",
      location: "0.5km away",
      rating: 4.9,
      reviewCount: 28,
      seller: "Herb Garden",
      image: "🌿",
      category: "Herbs",
      isFresh: true
    }
  ];


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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotate: 2,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-green-50 text-sm italic">
      {/* Header */}
     <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-4xl md:text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Fresh Local
              <motion.span 
                className="block text-green-600"
                whileHover={{ color: '#8b5cf6' }}
                transition={{ duration: 0.3 }}
              >
                Products
              </motion.span>
            </motion.h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover fresh, homegrown vegetables from local gardeners in your community
            </p>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Sort & Filter */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest</option>
                </select>

                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                   onClick={() => navigate('/singleProduct')}
                >
                  {/* Product Image */}
                  <motion.div
                    variants={imageVariants}
                    className="h-48 relative overflow-hidden bg-linear-to-br from-green-100 to-purple-100 flex items-center justify-center"
                  >
                    <motion.span 
                      className="text-6xl"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.image}
                    </motion.span>
                    

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        SALE
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <motion.h3 
                          className="text-lg font-semibold text-gray-800 mb-1"
                          whileHover={{ color: '#16a34a' }}
                        >
                          {product.name}
                        </motion.h3>
                        <p className="text-sm text-gray-500 mb-2">{product.seller}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <motion.span 
                            className="text-2xl font-bold text-green-600"
                            whileHover={{ scale: 1.1 }}
                          >
                            {product.price}
                          </motion.span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{product.expiry}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <motion.button
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      
                      >
                        <ShoppingBag size={18} />
                        <span>Buy Now</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              className="bg-linear-to-r from-green-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
           
            >
              Load More Products
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;