import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit2, 
  Save, 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Award,
  Heart,
  ShoppingBag,
  Clock,
  CheckCircle,
  Camera,
} from 'lucide-react';
import Header from '../components/Header';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('feedback');

  // User data
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate home gardener sharing fresh, organic vegetables with my local community. Love connecting with neighbors through food!',
    joinDate: 'January 2024',
    avatar: '/api/placeholder/150/150'
  });

  const [editedData, setEditedData] = useState(userData);

  // User stats
  const userStats = {
    productsSold: 47,
    productsListed: 12,
    averageRating: 4.8,
    totalReviews: 32,
    memberSince: '6 months'
  };

  // Recent feedback
  const recentFeedback = [
    {
      id: 1,
      user: 'Mike Chen',
      rating: 5,
      comment: 'Amazing tomatoes! So fresh and flavorful. Sarah was very friendly and the pickup was smooth.',
      date: '2 days ago',
      product: 'Organic Tomatoes'
    },
    {
      id: 2,
      user: 'Emily Davis',
      rating: 4,
      comment: 'Great quality carrots and very sweet. Would definitely buy again!',
      date: '1 week ago',
      product: 'Homegrown Carrots'
    },
    {
      id: 3,
      user: 'Alex Rodriguez',
      rating: 5,
      comment: 'The lettuce was incredibly fresh and crisp. Perfect for salads!',
      date: '2 weeks ago',
      product: 'Fresh Lettuce'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'sold',
      product: 'Organic Tomatoes',
      buyer: 'Mike Chen',
      date: '2 days ago',
      amount: '$2.50'
    },
    {
      id: 2,
      type: 'listed',
      product: 'Fresh Basil',
      date: '1 day ago',
      amount: '$1.75'
    },
    {
      id: 3,
      type: 'sold',
      product: 'Homegrown Carrots',
      buyer: 'Emily Davis',
      date: '1 week ago',
      amount: '$3.00'
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

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-green-50 overflow-x-hidden text-sm italic">

      {/* Header */}
      <Header />

      

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-400 to-purple-500 rounded-full -mr-16 -mt-16 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-br from-purple-400 to-green-500 rounded-full -ml-12 -mb-12 opacity-10"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 flex-wrap w-full overflow-hidden">

              {/* Avatar */}
              <motion.div
                className="relative group"
              >
                <div className="w-32 h-32 bg-linear-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {userData.name.charAt(0)}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border"
                >
                  <Camera size={16} className="text-gray-600" />
                </motion.button>
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="text-2xl sm:text-3xl font-bold bg-transparent border-b-2 border-green-500 outline-none w-full max-w-full wrap-break-words"

                      />
                    ) : (
                      <motion.h1 
                        className="text-2xl font-bold text-gray-800"
                        whileHover={{ color: '#16a34a' }}
                      >
                        {userData.name}
                      </motion.h1>
                    )}
                    
                    <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star size={20} className="fill-current" />
                        <span className="font-semibold text-gray-700">{userStats.averageRating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Award size={18} />
                        <span>{userStats.totalReviews} reviews</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar size={18} />
                        <span>Joined {userData.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`mt-4 md:mt-0 flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold ${
                      isEditing 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-linear-to-r from-green-500 to-purple-600 text-white hover:shadow-lg'
                    } transition-all duration-300`}
                  >
                    {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                  </motion.button>
                </div>

                {isEditing ? (
                  <textarea
                    value={editedData.bio}
                    onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                    className="w-full bg-transparent border-2 border-green-200 rounded-xl p-4 outline-none resize-none max-w-full"

                    rows={3}
                  />
                ) : (
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {userData.bio}
                  </motion.p>
                )}

                {/* Contact Info */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                  variants={containerVariants}
                >
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        className="bg-transparent border-b border-green-300 outline-none p-2 w-full max-w-full"

                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        className="bg-transparent border-b border-green-300 outline-none p-2 w-full max-w-full"

                        placeholder="Phone"
                      />
                      <input
                        type="text"
                        value={editedData.location}
                        onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                        className="bg-transparent border-b border-green-300 outline-none p-2 w-full max-w-full"

                        placeholder="Location"
                      />
                    </>
                  ) : (
                    <>
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-600"
                        whileHover={{ x: 5, color: '#16a34a' }}
                      >
                        <Mail size={18} />
                        <span>{userData.email}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-600"
                        whileHover={{ x: 5, color: '#16a34a' }}
                      >
                        <Phone size={18} />
                        <span>{userData.phone}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-600"
                        whileHover={{ x: 5, color: '#16a34a' }}
                      >
                        <MapPin size={18} />
                        <span>{userData.location}</span>
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex space-x-4 mt-6"
                  >
                    <motion.button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <X size={18} />
                      <span>Cancel</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { icon: ShoppingBag, label: 'Products Sold', value: userStats.productsSold, color: 'green' },
              { icon: Heart, label: 'Products Listed', value: userStats.productsListed, color: 'purple' },
              { icon: Star, label: 'Avg Rating', value: userStats.averageRating, color: 'yellow' },
              { icon: Clock, label: 'Member For', value: userStats.memberSince, color: 'blue' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon size={24} className={`text-${stat.color}-500`} />
                </div>
                <motion.p 
                  className="text-2xl font-bold text-gray-800"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg mb-8"
          >
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'feedback', label: 'Feedback', icon: Star },
                  { id: 'activity', label: 'Activity', icon: Clock },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'feedback' && (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Feedback</h3>
                    {recentFeedback.map((feedback, index) => (
                      <motion.div
                        key={feedback.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        className="bg-green-50 rounded-xl p-6 border border-green-100"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">{feedback.user}</h4>
                            <p className="text-sm text-gray-600">{feedback.product}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{feedback.comment}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{feedback.date}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            Reply
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'activity' && (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-green-200 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'sold' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          {activity.type === 'sold' ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {activity.type === 'sold' ? `Sold ${activity.product} to ${activity.buyer}` : `Listed ${activity.product}`}
                          </p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{activity.amount}</p>
                          <p className={`text-xs ${
                            activity.type === 'sold' ? 'text-green-600' : 'text-purple-600'
                          }`}>
                            {activity.type === 'sold' ? 'Completed' : 'Active'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;