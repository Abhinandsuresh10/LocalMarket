import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MessageCircle,
    MapPin,
    Eye,
    Package,
    User,
    DollarSign,
    Calendar,
    XCircle,
    Star
} from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface Order {
    id: string;
    productName: string;
    productImage: string;
    sellerName: string;
    sellerAvatar: string;
    sellerRating: number;
    price: string;
    quantity: string;
    orderDate: string;
    total: string;
}

const OrdersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const navigate = useNavigate();

    const orders: Order[] = [
        {
            id: 'ORD-001',
            productName: 'Organic Tomatoes',
            productImage: 'https://images.unsplash.com/photo-1546470427-e212b7d31089?w=400',
            sellerName: 'Sarah Johnson',
            sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            sellerRating: 4.8,
            price: '$2.50',
            quantity: '2 kg',
            orderDate: '2024-01-15',
            total: '$5.00'
        },
        {
            id: 'ORD-002',
            productName: 'Homegrown Carrots',
            productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
            sellerName: 'Mike Chen',
            sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            sellerRating: 4.9,
            price: '$3.00',
            quantity: '1.5 kg',
            orderDate: '2024-01-16',
            total: '$4.50'
        },
        {
            id: 'ORD-003',
            productName: 'Fresh Lettuce Bundle',
            productImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
            sellerName: 'Green Thumb Gardens',
            sellerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
            sellerRating: 4.7,
            price: '$1.75',
            quantity: '3 bunches',
            orderDate: '2024-01-14',
            total: '$5.25'
        },
        {
            id: 'ORD-004',
            productName: 'Sweet Bell Peppers',
            productImage: 'https://images.unsplash.com/photo-1525607551107-68e20c75b1a9?w=400',
            sellerName: 'Pepper Paradise',
            sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            sellerRating: 4.6,
            price: '$4.25',
            quantity: '1 kg',
            orderDate: '2024-01-13',
            total: '$4.25'
        }
    ];

    const filteredOrders = orders.filter(order => {
        return order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               order.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               order.id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-white to-green-50 text-sm italic">
            <Header />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <motion.h1 
                            className="text-3xl md:text-3xl font-bold text-gray-800 mb-4"
                            whileHover={{ color: '#16a34a' }}
                        >
                            My Orders
                            <motion.span 
                                className="block text-green-600 text-xl md:text-xl"
                                whileHover={{ color: '#8b5cf6' }}
                            >
                                Manage your purchases
                            </motion.span>
                        </motion.h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            View and manage all your orders in one place
                        </p>
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8"
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders by product, seller, or order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </motion.div>

                    {/* Orders List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {filteredOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        {/* Left Section - Product & Seller Info */}
                                        <div className="flex items-start space-x-4 flex-1 min-w-0">
                                            <img
                                                src={order.productImage}
                                                alt={order.productName}
                                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                                            />
                                            
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 gap-1">
                                                    <h3 className="font-semibold text-gray-800 text-md">
                                                        {order.productName}
                                                    </h3>
                                                    <div className="hidden sm:block text-gray-400">•</div>
                                                    <div className="flex items-center space-x-1">
                                                        <User size={16} className="text-green-500" />
                                                        <span className="text-gray-600 font-medium">
                                                            {order.sellerName}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                                                        <DollarSign size={14} className="text-green-500" />
                                                        <span className="text-green-700 font-medium">{order.price}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-full">
                                                        <Package size={14} className="text-purple-500" />
                                                        <span className="text-purple-700">{order.quantity}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
                                                        <Calendar size={14} className="text-gray-500" />
                                                        <span>{formatDate(order.orderDate)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Section - Total & Actions */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 lg:gap-6">
                                            {/* Total Price */}
                                            <div className="text-center sm:text-right">
                                                <p className="text-2xl font-bold text-green-600">{order.total}</p>
                                                <p className="text-sm text-gray-500">Total Amount</p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <motion.button
                                                    onClick={() => navigate('/chat')}
                                                    className="px-4 py-2 bg-linear-to-r from-green-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <MessageCircle size={18} />
                                                    <span>Chat</span>
                                                </motion.button>
                                                
                                                <motion.button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="px-4 py-2 bg-white border-2 border-green-500 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Eye size={18} />
                                                    <span>Details</span>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Empty State */}
                    {filteredOrders.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <div className="w-24 h-24 bg-linear-to-br from-green-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package size={40} className="text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm 
                                    ? 'Try adjusting your search criteria'
                                    : "You haven't placed any orders yet"
                                }
                            </p>
                            <motion.button
                                className="bg-linear-to-r from-green-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Browse Products
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                                    <motion.button
                                        onClick={() => setSelectedOrder(null)}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <XCircle size={24} />
                                    </motion.button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                                    {/* Left Column - Product Info */}
                                    <div className="space-y-6">
                                        {/* Product Information */}
                                        <div className="bg-linear-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                                <Package className="text-green-500" />
                                                <span>Product Information</span>
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                                <img
                                                    src={selectedOrder.productImage}
                                                    alt={selectedOrder.productName}
                                                    className="w-24 h-24 rounded-xl object-cover mx-auto sm:mx-0"
                                                />
                                                <div className="text-center sm:text-left">
                                                    <h4 className="font-semibold text-gray-800 text-lg">{selectedOrder.productName}</h4>
                                                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                                                        <span className="text-green-600 font-semibold text-lg">{selectedOrder.price}</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-600">{selectedOrder.quantity}</span>
                                                    </div>
                                                    <p className="text-3xl font-bold text-gray-800 mt-3">{selectedOrder.total}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Information */}
                                        <div className="bg-linear-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                                <Calendar className="text-purple-500" />
                                                <span>Order Information</span>
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Order ID</span>
                                                    <span className="text-gray-800 font-medium">{selectedOrder.id}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Order Date</span>
                                                    <span className="text-gray-800 font-medium">{formatDate(selectedOrder.orderDate)}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Quantity</span>
                                                    <span className="text-gray-800 font-medium">{selectedOrder.quantity}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Unit Price</span>
                                                    <span className="text-gray-800 font-medium">{selectedOrder.price}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                                                    <span className="text-gray-800 font-semibold">Total Amount</span>
                                                    <span className="text-gray-800 font-bold text-lg">{selectedOrder.total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Seller Info */}
                                    <div className="space-y-6">
                                        {/* Seller Information */}
                                        <div className="bg-linear-to-br from-green-50 to-purple-50 rounded-2xl p-6 border border-green-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                                <User className="text-green-500" />
                                                <span>Seller Information</span>
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                                                <img
                                                    src={selectedOrder.sellerAvatar}
                                                    alt={selectedOrder.sellerName}
                                                    className="w-16 h-16 rounded-full object-cover mx-auto sm:mx-0"
                                                />
                                                <div className="text-center sm:text-left">
                                                    <h4 className="font-semibold text-gray-800 text-xl">{selectedOrder.sellerName}</h4>
                                                    <div className="flex items-center justify-center sm:justify-start space-x-1 mt-1">
                                                        <Star size={20} className="text-yellow-400 fill-current" />
                                                        <span className="text-gray-600">{selectedOrder.sellerRating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="space-y-3">
                                                <motion.button
                                                    onClick={() => navigate('/chat')}
                                                    className="w-full bg-linear-to-r from-green-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <MessageCircle size={20} />
                                                    <span>Chat + Location</span>
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Delivery Information */}
                                        <div className="bg-linear-to-br from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                                <MapPin className="text-blue-500" />
                                                <span>Pickup Information</span>
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <MapPin size={20} className="text-green-500" />
                                                    <div>
                                                        <p className="font-medium text-gray-800">123 Garden Street</p>
                                                        <p className="text-sm text-gray-600">Green Valley, Near community park</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Calendar size={20} className="text-purple-500" />
                                                    <div>
                                                        <p className="font-medium text-gray-800">Scheduled Pickup</p>
                                                        <p className="text-sm text-gray-600">Tomorrow at 3:00 PM</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersPage;