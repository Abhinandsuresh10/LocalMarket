import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Calendar,     
  Shield,
  Clock,
  User,
  Truck
} from 'lucide-react';
import Header from '../components/Header';

const SingleProductPage: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);

  // Product data
  const product = {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh from my backyard garden, grown completely without pesticides or chemical fertilizers. These tomatoes are vine-ripened and packed with flavor. Perfect for salads, sauces, sandwiches, or eating fresh.",
    price: "$2.50",
    originalPrice: "$3.00",
    expiry: "5 days",
    location: "1.2km away",
    rating: 4.8,
    reviewCount: 24,
    seller: {
      name: "Sarah Johnson",
      joinDate: "January 2024",
      rating: 4.9,
      totalSales: 47,
      responseRate: "98%",
      avgResponseTime: "< 2 hours"
    },
    category: "Vegetables",
    quantity: "1kg",
    harvestDate: "Today",
    delivery: "Pickup only",
    tags: ["Organic", "Fresh", "Homegrown", "No Pesticides"],
    images: ["🍅", "🌿", "🏡", "👩‍🌾"]
  };

  // Dummy map coordinates (you'll replace with Leaflet later)
  const userLocation = { lat: 40.7128, lng: -74.0060 }; // New York
  const sellerLocation = { lat: 40.7209, lng: -73.9987 }; // Nearby in NY

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Simple distance calculation (in real app, use Haversine formula)
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)) * 111; // Rough km conversion
  };

  const distance = calculateDistance(
    userLocation.lat, userLocation.lng,
    sellerLocation.lat, sellerLocation.lng
  ).toFixed(1);

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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    },
    hover: {
      scale: 1.05,
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
          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              {/* Main Image */}
              <motion.div
                variants={imageVariants}
                className="bg-linear-to-br from-green-100 to-purple-100 rounded-3xl h-80 md:h-96 flex items-center justify-center relative overflow-hidden"
              >
                <motion.span 
                  className="text-8xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, 0, -2, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {product.images[activeImage]}
                </motion.span>

              

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                >
                  SALE
                </motion.div>

               
              </motion.div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`bg-linear-to-br from-green-50 to-purple-50 rounded-xl h-20 flex items-center justify-center border-2 ${
                      activeImage === index ? 'border-green-500' : 'border-transparent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{image}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Product Header */}
              <div>
                <motion.h1 
                  className="text-3xl md:text-3xl font-bold text-gray-800 mb-2"
                  whileHover={{ color: '#16a34a' }}
                >
                  {product.name}
                </motion.h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star size={20} className="text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-gray-500">({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <MapPin size={16} />
                    <span className="text-sm">{product.location}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <motion.span 
                    className="text-4xl font-bold text-green-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.price}
                  </motion.span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Harvested</p>
                      <p className="font-semibold">{product.harvestDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Expires in</p>
                      <p className="font-semibold">{product.expiry}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Truck size={18} className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Delivery</p>
                      <p className="font-semibold">{product.delivery}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Shield size={18} className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">{product.quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </motion.div>

              {/* Seller Info */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.seller.name}</h3>
                    <p className="text-sm text-gray-500">Joined {product.seller.joinDate}</p>
                  </div>
                  <div className="flex items-center space-x-1 ml-auto">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-semibold">{product.seller.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{product.seller.totalSales}</p>
                    <p className="text-xs text-gray-500">Sales</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{product.seller.responseRate}</p>
                    <p className="text-xs text-gray-500">Response</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">{product.seller.avgResponseTime}</p>
                    <p className="text-xs text-gray-500">Response Time</p>
                  </div>
                </div>

                {/* Connect Button */}
                <div className="relative">
                  <motion.button
                    className="w-full bg-linear-to-r from-green-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                   
                  >
                    Start Purchase
                  </motion.button>

                  
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Location & Distance</h2>
              <p className="text-gray-600">See how far you are from the seller</p>
            </div>

            {/* Dummy Map - Replace with Leaflet */}
            <div className="h-80 md:h-96 bg-linear-to-br from-green-100 to-blue-100 relative flex items-center justify-center">
              {/* Map placeholder with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
                <p className="text-gray-600">Leaflet map will be integrated here</p>
              </motion.div>

              {/* Distance Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-green-500" />
                  <div>
                    <p className="font-semibold text-gray-800">{distance} km away</p>
                    <p className="text-sm text-gray-500">From your location</p>
                  </div>
                </div>
              </motion.div>

              {/* User and Seller Markers */}
              <motion.div
                className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                  <User size={16} />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">You</p>
              </motion.div>

              <motion.div
                className="absolute right-1/4 top-1/2 transform -translate-y-1/2"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <MapPin size={16} />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">Seller</p>
              </motion.div>

            </div>

            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{distance} km</p>
                  <p className="text-sm text-gray-600">Distance</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">~5 min</p>
                  <p className="text-sm text-gray-600">By Car</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">~15 min</p>
                  <p className="text-sm text-gray-600">Walking</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleProductPage;