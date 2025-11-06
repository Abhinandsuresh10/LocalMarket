import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Star, MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  // Dummy products data
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      description: "Fresh from my backyard garden, grown without pesticides",
      price: "$2.50",
      expiry: "5 days",
      location: "1.2km away",
      image: "/api/placeholder/300/200",
      rating: 4.8
    },
    {
      id: 2,
      name: "Homegrown Carrots",
      description: "Sweet and crunchy, harvested this morning",
      price: "$3.00",
      expiry: "7 days",
      location: "0.8km away",
      image: "/api/placeholder/300/200",
      rating: 4.9
    },
    {
      id: 3,
      name: "Fresh Lettuce",
      description: "Crisp and green, perfect for salads",
      price: "$1.75",
      expiry: "3 days",
      location: "1.5km away",
      image: "/api/placeholder/300/200",
      rating: 4.7
    }
  ];

  // Dummy feedback data
  const feedbacks = [
    {
      id: 1,
      name: "Sarah Johnson",
      comment: "Amazing fresh vegetables! The tomatoes were so flavorful and the seller was very friendly.",
      rating: 5,
      location: "Local Gardener"
    },
    {
      id: 2,
      name: "Mike Chen",
      comment: "Love supporting local growers. The quality is much better than supermarket vegetables!",
      rating: 5,
      location: "Regular Buyer"
    },
    {
      id: 3,
      name: "Emily Davis",
      comment: "The roadmap feature is brilliant! Found fresh carrots just around the corner.",
      rating: 4,
      location: "New User"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants:Variants  = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1 
              className="text-4xl md:text-4xl font-bold text-gray-800 leading-tight italic"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Fresh From
              <motion.span 
                className="block text-green-600"
                whileHover={{ color: '#8b5cf6' }}
                transition={{ duration: 0.3 }}
              >
                Local Gardens
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-md italic text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              Connect with your neighbors and discover fresh, homegrown vegetables 
              right in your community. Share your harvest, reduce waste, and build 
              a sustainable local food network.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                whileHover={{  backgroundColor: '#8b5cf6' }}
              >
                <span className='italic text-sm'>Start Selling</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                className="border-2 italic text-sm border-green-500 text-green-500 px-8 py-3 rounded-full font-semibold hover:border-purple-600 hover:text-purple-600 transition-colors duration-300"
                
              >
                Browse Products
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image with Animation */}
          <motion.div
            variants={imageVariants}
            // whileHover="hover"
            className="relative"
          >
            <div className="w-full h-80 md:h-96 bg-linear-to-br from-green-400 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center">
             
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="container mx-auto px-4 py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl italic md:text-2xl font-bold text-gray-800 mb-4">
            Fresh From Nearby Gardens
          </h2>
          <p className="text-gray-600 max-w-2xl italic mx-auto">
            Discover vegetables grown by your neighbors with real-time location tracking
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-linear-to-br from-green-200 to-purple-200 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl"
                  >
                    {product.id === 1 ? '🍅' : product.id === 2 ? '🥕' : '🥬'}
                  </motion.div>
                </div>
                
                {/* Hover Overlay */}
                <motion.div
                  className="absolute text-sm italic inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center transition-all duration-300"
                  whileHover={{ opacity: 1 }}
                  onClick={() => navigate('/singleProduct')}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white text-center p-4"
                  >
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="mb-3">{product.description}</p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{product.expiry}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{product.location}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="p-6 text-sm italic">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <span className="text-green-600 font-bold">{product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MapPin size={16} />
                    <span className="text-sm">{product.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            className="bg-linear-to-r text-sm italic from-green-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          
            onClick={() => navigate('/products')}
          >
            See More Products
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16 bg-green-50 text-sm italic">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-2xl font-bold text-gray-800 mb-6">
              About LocalMarket
            </h2>
            <motion.p 
              className="text-gray-600 mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              LocalMarket revolutionizes how communities share and access fresh, homegrown vegetables. 
              We connect local growers with their neighbors, creating a sustainable food ecosystem.
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Our platform makes it easy to share your garden's bounty, reduce food waste, and 
              discover the freshest produce right in your neighborhood.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {['Real-time location tracking', 'Freshness indicators', 'Direct communication', 'Sustainable community'].map((feature) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="text-3xl mb-3">
                  {item === 1 ? '📍' : item === 2 ? '🕒' : item === 3 ? '🌱' : '👥'}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {item === 1 ? 'Local' : item === 2 ? 'Fresh' : item === 3 ? 'Organic' : 'Community'}
                </h3>
                <p className="text-sm text-gray-600">
                  {item === 1 ? 'Find products nearby' : item === 2 ? 'Harvested daily' : item === 3 ? 'Homegrown quality' : 'Connect locally'}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="container mx-auto px-4 py-16 italic text-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-2xl font-bold text-gray-800 mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy gardeners and buyers building better food communities
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-6 relative"
            >
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-linear-to-r from-green-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart size={16} className="text-white" />
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-4 italic">"{feedback.comment}"</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                  <p className="text-sm text-gray-500">{feedback.location}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-green-600 font-semibold">
                    {feedback.name.charAt(0)}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 text-sm italic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">LocalMarket</h3>
              <p className="text-gray-400">
                Connecting communities through fresh, local vegetables.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-green-400 transition-colors">Products</a></li>
                <li><a href="#about" className="hover:text-green-400 transition-colors">About</a></li>
                <li><a href="#feedback" className="hover:text-green-400 transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Community Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: hello@localmarket.com</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 LocalMarket. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;    