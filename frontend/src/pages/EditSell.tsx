import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Upload,
    X,
    Camera,
    MapPin,
    Calendar,
    DollarSign,
    Edit2,
    Crop,
    RotateCw,
    Check,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import Header from '../components/Header';

interface ImageData {
    file: File;
    preview: string;
    cropped?: boolean;
}

interface ProductData {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    quantityAmount: string;
    quantityUnit: string;
    expiryDate: string;
    location: string;
    contactInfo: string;
    existingImages?: string[]; // URLs of existing images from server
}

const EditProductPage: React.FC = () => {
    // This would typically come from props or route parameters
    const [productId] = useState('123'); // In real app, get from URL params

    const [formData, setFormData] = useState<ProductData>({
        id: '',
        title: '',
        description: '',
        price: '',
        category: '',
        quantityAmount: '',
        quantityUnit: '',
        expiryDate: '',
        location: '',
        contactInfo: '',
        existingImages: []
    });

    const [images, setImages] = useState<ImageData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [croppingImage, setCroppingImage] = useState<{ index: number, data: ImageData } | null>(null);
    const [cropZoom, setCropZoom] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = [
        'Vegetables',
        'Fruits',
        'Herbs',
        'Leafy Greens',
        'Root Vegetables',
        'Other'
    ];

    const quantityUnits = [
        { value: 'kg', label: 'Kilograms (kg)' },
        { value: 'g', label: 'Grams (g)' },
    ];

    // Simulate loading product data
    useEffect(() => {
        const loadProductData = async () => {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                const mockProductData: ProductData = {
                    id: '123',
                    title: 'Organic Tomatoes',
                    description: 'Fresh from my backyard garden, grown completely without pesticides or chemical fertilizers. These tomatoes are vine-ripened and packed with flavor.',
                    price: '2.50',
                    category: 'Vegetables',
                    quantityAmount: '2',
                    quantityUnit: 'kg',
                    expiryDate: '2024-12-31',
                    location: '123 Garden Street, Green Valley',
                    contactInfo: 'sarah@example.com',
                    existingImages: [
                        'https://images.unsplash.com/photo-1546470427-e212b7d31089?w=400',
                        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'
                    ]
                };
                setFormData(mockProductData);
                
                // Convert existing images to ImageData format
                const existingImageData: ImageData[] = mockProductData.existingImages?.map((url, index) => ({
                    file: new File([], `existing-${index}.jpg`),
                    preview: url,
                    cropped: false
                })) || [];
                setImages(existingImageData);
                setIsLoading(false);
            }, 1000);
        };

        loadProductData();
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updated product data:', { ...formData, images });
        // Handle update submission
        // This would typically send the data to your backend
    };

    const handleFileSelect = (files: FileList) => {
        const newFiles = Array.from(files).slice(0, 4 - images.length);

        newFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData: ImageData = {
                        file: file,
                        preview: e.target?.result as string,
                        cropped: false
                    };
                    setImages(prev => [...prev, imageData]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const startCrop = (index: number) => {
        setCroppingImage({ index, data: images[index] });
        setCropZoom(1);
    };

    const applyCrop = () => {
        if (croppingImage) {
            const updatedImages = [...images];
            updatedImages[croppingImage.index] = {
                ...updatedImages[croppingImage.index],
                cropped: true
            };
            setImages(updatedImages);
            setCroppingImage(null);
        }
    };

    const cancelCrop = () => {
        setCroppingImage(null);
    };

    const rotateImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages[index] = {
            ...updatedImages[index],
            cropped: true
        };
        setImages(updatedImages);
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-white to-green-50">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-white to-green-50  text-sm italic">
            {/* Header */}
            <Header />
            
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Page Header */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-8"
                    >

                        <motion.h1
                            className="text-3xl md:text-3xl font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Edit Your
                            <motion.span
                                className="block text-green-600"
                                whileHover={{ color: '#8b5cf6' }}
                                transition={{ duration: 0.3 }}
                            >
                                Product Listing
                            </motion.span>
                        </motion.h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Update your product information. Make changes to the details, images, or pricing below.
                        </p>
                    </motion.div>

                    {/* Cropping Modal */}
                    {croppingImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="bg-white rounded-3xl p-6 max-w-2xl w-full"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                                        <Crop size={24} className="text-green-500" />
                                        <span>Crop Image</span>
                                    </h3>
                                    <button
                                        onClick={cancelCrop}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Crop Area */}
                                <div className="border-2 border-dashed border-green-300 rounded-xl p-4 mb-4 bg-gray-50">
                                    <div className="relative overflow-hidden rounded-lg bg-gray-100 min-h-[300px] flex items-center justify-center">
                                        <img
                                            src={croppingImage.data.preview}
                                            alt="Crop preview"
                                            className="max-w-full max-h-[300px] object-contain transition-transform duration-200"
                                            style={{ transform: `scale(${cropZoom})` }}
                                        />

                                        {/* Crop Grid Overlay */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="grid grid-cols-3 grid-rows-3 h-full">
                                                {[...Array(9)].map((_, i) => (
                                                    <div key={i} className="border border-green-200 border-opacity-50"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Crop Controls */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">Zoom:</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCropZoom(prev => Math.max(0.5, prev - 0.1))}
                                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                <ZoomOut size={16} />
                                            </button>
                                            <span className="text-sm font-medium w-12 text-center">
                                                {Math.round(cropZoom * 100)}%
                                            </span>
                                            <button
                                                onClick={() => setCropZoom(prev => Math.min(3, prev + 0.1))}
                                                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                <ZoomIn size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <motion.button
                                            onClick={applyCrop}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Check size={16} />
                                            <span>Apply Crop</span>
                                        </motion.button>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 text-center">
                                    Drag to adjust the crop area. The selected area will be used as your product image.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Images */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-6"
                            >
                                {/* Image Upload Section */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                        <Camera size={20} className="text-green-500" />
                                        <span>Product Images</span>
                                        <span className="text-sm text-gray-500 ml-auto">({images.length}/4)</span>
                                    </h3>

                                    {/* Upload Area */}
                                    {images.length < 4 && (
                                        <motion.div
                                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${isDragging
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-300 hover:border-green-400'
                                                }`}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="cursor-pointer"
                                            >
                                                <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 mb-2">
                                                    {isDragging ? 'Drop images here' : 'Click to upload or drag and drop'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Upload up to 4 images (PNG, JPG, WEBP)
                                                </p>
                                            </motion.div>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                                                className="hidden"
                                            />
                                        </motion.div>
                                    )}

                                    {/* Image Grid */}
                                    {images.length > 0 && (
                                        <motion.div
                                            className="grid grid-cols-2 gap-4 mt-6"
                                        >
                                            {images.map((image, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative group"
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                                                        <img
                                                            src={image.preview}
                                                            alt={`Product ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />

                                                        {/* Image Overlay Actions */}
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                                                            <motion.button
                                                                type="button"
                                                                onClick={() => startCrop(index)}
                                                                className="bg-white p-2 rounded-full shadow-lg"
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <Crop size={16} className="text-gray-700" />
                                                            </motion.button>

                                                            <motion.button
                                                                type="button"
                                                                onClick={() => rotateImage(index)}
                                                                className="bg-white p-2 rounded-full shadow-lg"
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <RotateCw size={16} className="text-gray-700" />
                                                            </motion.button>

                                                            <motion.button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="bg-white p-2 rounded-full shadow-lg"
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <X size={16} className="text-red-500" />
                                                            </motion.button>
                                                        </div>

                                                        {/* Image Number Badge */}
                                                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                                            {index + 1}
                                                        </div>

                                                        {/* Crop Indicator */}
                                                        {image.cropped && (
                                                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                                                                <Crop size={10} />
                                                                <span>Edited</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* Image Tips */}
                                    <motion.div
                                        className="mt-6 p-4 bg-green-50 rounded-xl"
                                    >
                                        <h4 className="font-semibold text-green-800 mb-2">📸 Image Tips</h4>
                                        <ul className="text-sm text-green-700 space-y-1">
                                            <li>• Use natural lighting for best results</li>
                                            <li>• Show the actual size and quality</li>
                                            <li>• Include different angles</li>
                                            <li>• Make sure images are clear and focused</li>
                                        </ul>
                                    </motion.div>
                                </div>

                                {/* Location & Contact */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                        <MapPin size={20} className="text-green-500" />
                                        <span>Location & Contact</span>
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your address or area"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Contact Information
                                            </label>
                                            <input
                                                type="text"
                                                name="contactInfo"
                                                value={formData.contactInfo}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Phone number or email for buyers"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Right Column - Product Details */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-6"
                            >
                                {/* Basic Information */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                        <Edit2 size={18} className="text-green-500" />
                                        <span>Product Details</span>
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Product Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                placeholder="e.g., Fresh Organic Tomatoes"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                                                placeholder="Describe your product in detail..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Category
                                                </label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                >
                                                    <option value="">Select category</option>
                                                    {categories.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Quantity Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="quantityAmount"
                                                        value={formData.quantityAmount}
                                                        onChange={handleChange}
                                                        required
                                                        min="1"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                        placeholder="Amount"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Unit
                                                    </label>
                                                    <select
                                                        name="quantityUnit"
                                                        value={formData.quantityUnit}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                    >
                                                        <option value="">Select unit</option>
                                                        {quantityUnits.map(unit => (
                                                            <option key={unit.value} value={unit.value}>
                                                                {unit.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing & Expiry */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                        <DollarSign size={20} className="text-green-500" />
                                        <span>Pricing & Availability</span>
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Price
                                                </label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date
                                                </label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        type="date"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <motion.button
                                        type="submit"
                                        className="flex-1 bg-linear-to-r from-green-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Check size={20} />
                                        <span>Update Product</span>
                                    </motion.button>
                                    
                                    <motion.button
                                        type="button"
                                        className="px-6 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 flex items-center justify-center"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <X size={20} />
                                        <span className="hidden sm:inline ml-2">Cancel</span>
                                    </motion.button>
                                </div>

                                {/* Help Text */}
                                <motion.div
                                    className="text-center"
                                >
                                    <p className="text-sm text-gray-500">
                                        Your changes will be visible to buyers immediately after updating.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EditProductPage;