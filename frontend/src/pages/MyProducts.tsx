import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
    Edit2,
    Trash2, 
    Plus,
    Filter,
    Search,
    MoreVertical,
    Calendar,
    MapPin,
    DollarSign,
    Package,
} from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    quantity: string;
    expiryDate: string;
    location: string;
    status: 'active' | 'sold' | 'expired' | 'draft';
    images: string[];
    createdAt: string;
    views: number;
    likes: number;
    sales: number;
}

type Status = 'all' | 'available' | 'sold' | 'expired';

const MyProductsPage: React.FC = () => {
    const [filter, setFilter] = useState<Status>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - in real app, this would come from API
    const products: Product[] = [
        {
            id: '1',
            title: 'Organic Tomatoes',
            description: 'Fresh from my backyard garden, grown without pesticides',
            price: '$2.50',
            category: 'Vegetables',
            quantity: '2 kg',
            expiryDate: '2024-12-31',
            location: '1.2km away',
            status: 'active',
            images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'],
            createdAt: '2024-01-15',
            views: 124,
            likes: 18,
            sales: 0
        },
        {
            id: '2',
            title: 'Homegrown Carrots',
            description: 'Sweet and crunchy carrots harvested this morning',
            price: '$3.00',
            category: 'Vegetables',
            quantity: '1.5 kg',
            expiryDate: '2024-12-28',
            location: '0.8km away',
            status: 'active',
            images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'],
            createdAt: '2024-01-10',
            views: 89,
            likes: 12,
            sales: 3
        },
        {
            id: '3',
            title: 'Fresh Lettuce Bundle',
            description: 'Crisp and green lettuce, perfect for fresh salads',
            price: '$1.75',
            category: 'Leafy Greens',
            quantity: '3 bunches',
            expiryDate: '2024-12-20',
            location: '1.5km away',
            status: 'sold',
            images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'],
            createdAt: '2024-01-05',
            views: 156,
            likes: 24,
            sales: 1
        },
        {
            id: '4',
            title: 'Sweet Bell Peppers',
            description: 'Colorful bell peppers in red, yellow, and green',
            price: '$4.25',
            category: 'Vegetables',
            quantity: '1 kg',
            expiryDate: '2024-12-25',
            location: '2.1km away',
            status: 'expired',
            images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'],
            createdAt: '2024-01-02',
            views: 203,
            likes: 31,
            sales: 0
        },
        {
            id: '5',
            title: 'Organic Cucumbers',
            description: 'Fresh organic cucumbers, perfect for salads',
            price: '$2.75',
            category: 'Vegetables',
            quantity: '5 pieces',
            expiryDate: '2024-12-30',
            location: '1.8km away',
            status: 'draft',
            images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'],
            createdAt: '2024-01-18',
            views: 0,
            likes: 0,
            sales: 0
        }
    ];

    const filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || product.status === filter;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'sold': return 'bg-blue-100 text-blue-800';
            case 'expired': return 'bg-red-100 text-red-800';
            case 'draft': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Active';
            case 'sold': return 'Sold';
            case 'expired': return 'Expired';
            case 'draft': return 'Draft';
            default: return status;
        }
    };

    const containerVariants:Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants:Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const cardVariants:Variants = {
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

    const navigate = useNavigate();
    
    const statuses: Status[] = ['all', 'available', 'sold', 'expired'];

    return (
        <div className="min-h-screen bg-linear-to-br from-white to-green-50 text-sm italic">
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
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
                    >
                        <div>
                            <motion.h1
                                className="text-3xl md:text-3xl font-bold text-gray-800 mb-2"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                My Products
                                <motion.span
                                    className="block text-green-600 text-xl md:text-xl"
                                    whileHover={{ color: '#8b5cf6' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Manage your listings
                                </motion.span>
                            </motion.h1>
                            <p className="text-gray-600">
                                View and manage all your product listings in one place
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Overview */}
                  

                    {/* Filters and Search */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            {/* Search */}
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search your products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center space-x-4">
                                <Filter size={20} className="text-gray-400" />
                                <div className="flex flex-wrap gap-2">
                                    {statuses.map((status) => (
                                        <motion.button
                                            key={status}
                                            onClick={() => setFilter(status)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                                filter === status
                                                    ? 'bg-green-500 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {status === 'all' ? 'All' : getStatusText(status)}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                onClick={() => navigate('/editSell')}
                            >
                                {/* Product Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Status Badge */}
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                                        {getStatusText(product.status)}
                                    </div>

                                    {/* Stats Overlay */}
                                   
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate flex-1 mr-2">
                                            {product.title}
                                        </h3>
                                        <div className="relative">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreVertical size={16} />
                                            </motion.button>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <DollarSign size={14} />
                                                <span className="font-semibold text-green-600">{product.price}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Package size={14} />
                                                <span>{product.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <MapPin size={14} />
                                                <span>{product.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{new Date(product.expiryDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                       
                                            <>
                                                <motion.button
                                                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center justify-center space-x-1"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Edit2 size={14} />
                                                    <span>Edit</span>
                                                </motion.button>
                                                <motion.button
                                                    className="flex-1 border border-red-500 text-red-600 py-2 px-3 rounded-lg text-sm hover:bg-white transition-colors flex items-center justify-center space-x-1"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Trash2 size={14} />
                                                    <span>Delete</span>
                                                </motion.button>
                                            </>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || filter !== 'all' 
                                    ? 'Try adjusting your search or filter criteria'
                                    : "You haven't listed any products yet"
                                }
                            </p>
                            <motion.button
                                className="bg-linear-to-r from-green-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Plus size={20} />
                                <span>List Your First Product</span>
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MyProductsPage;