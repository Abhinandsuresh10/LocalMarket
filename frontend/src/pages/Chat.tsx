import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Smile,
    ArrowLeft,
    Check,
    CheckCheck,
    Clock,
    Paperclip,
    MapPin,
    Navigation,
    User,
    Clock as ClockIcon
} from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'seller';
    timestamp: Date;
    type: 'text' | 'image';
    imageUrl?: string;
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi! I\'m interested in your organic tomatoes. Are they still available?',
            sender: 'user',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text',
            status: 'read'
        },
        {
            id: '2',
            text: 'Yes, they are! I harvested them this morning. They\'re very fresh.',
            sender: 'seller',
            timestamp: new Date(Date.now() - 3500000),
            type: 'text',
            status: 'read'
        },
        {
            id: '3',
            text: 'Great! Can you send me some photos?',
            sender: 'user',
            timestamp: new Date(Date.now() - 3400000),
            type: 'text',
            status: 'read'
        },
        {
            id: '4',
            text: '',
            sender: 'seller',
            timestamp: new Date(Date.now() - 3300000),
            type: 'image',
            imageUrl: 'https://images.unsplash.com/photo-1546470427-e212b7d31089?w=400',
            status: 'read'
        },
        {
            id: '5',
            text: 'They look amazing! How much for 2kg?',
            sender: 'user',
            timestamp: new Date(Date.now() - 3200000),
            type: 'text',
            status: 'read'
        },
        {
            id: '6',
            text: 'That would be $5.00 for 2kg. When would you like to pick them up?',
            sender: 'seller',
            timestamp: new Date(Date.now() - 3100000),
            type: 'text',
            status: 'read'
        }
    ]);
    
    const [newMessage, setNewMessage] = useState('');
    const [activeView, setActiveView] = useState<'chat' | 'location'>('chat');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const seller = {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        isOnline: true
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: Date.now().toString(),
            text: newMessage,
            sender: 'user',
            timestamp: new Date(),
            type: 'text',
            status: 'sending'
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');

        setTimeout(() => {
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === message.id 
                        ? { ...msg, status: 'delivered' }
                        : msg
                )
            );

            setTimeout(() => {
                const responses = [
                    "Sounds good! I'll have them ready for you.",
                    "Great! Don't forget to bring cash.",
                    "Perfect timing! The tomatoes are at their peak freshness.",
                    "I'll be waiting. Text me when you're nearby!"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                const response: Message = {
                    id: (Date.now() + 1).toString(),
                    text: randomResponse,
                    sender: 'seller',
                    timestamp: new Date(),
                    type: 'text',
                    status: 'delivered'
                };
                setMessages(prev => [...prev, response]);
            }, 2000);
        }, 1000);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const message: Message = {
                    id: Date.now().toString(),
                    text: '',
                    sender: 'user',
                    timestamp: new Date(),
                    type: 'image',
                    imageUrl: e.target?.result as string,
                    status: 'sending'
                };

                setMessages(prev => [...prev, message]);

                setTimeout(() => {
                    setMessages(prev => 
                        prev.map(msg => 
                            msg.id === message.id 
                                ? { ...msg, status: 'delivered' }
                                : msg
                        )
                    );
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getStatusIcon = (status: Message['status']) => {
        switch (status) {
            case 'sending':
                return <Clock size={14} className="text-gray-400" />;
            case 'sent':
                return <Check size={14} className="text-gray-400" />;
            case 'delivered':
                return <CheckCheck size={14} className="text-gray-400" />;
            case 'read':
                return <CheckCheck size={14} className="text-blue-500" />;
            default:
                return null;
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div className="h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-green-500 text-white px-4 py-3 shadow-lg shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-white"
                        >
                            <ArrowLeft size={24} />
                        </motion.button>
                        
                        <div className="relative">
                            <img
                                src={seller.avatar}
                                alt={seller.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-400" />
                        </div>
                        
                        <div>
                            <h2 className="font-semibold text-lg">{seller.name}</h2>
                            <p className="text-green-100 text-sm">
                                {seller.isOnline ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                    
                   
                </div>
                
                {/* Mobile Toggle Buttons */}
                <div className="lg:hidden flex mt-3 bg-green-600 rounded-lg p-1">
                    <motion.button
                        onClick={() => setActiveView('chat')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                            activeView === 'chat' 
                                ? 'bg-white text-green-600 shadow-sm' 
                                : 'text-green-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        💬 Chat
                    </motion.button>
                    <motion.button
                        onClick={() => setActiveView('location')}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                            activeView === 'location' 
                                ? 'bg-white text-green-600 shadow-sm' 
                                : 'text-green-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        📍 Location
                    </motion.button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Chat Section */}
                <div className={`${
                    activeView === 'chat' ? 'flex' : 'hidden'
                } lg:flex flex-col flex-1 min-w-0`}>
                    {/* Messages Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                        <div className="max-w-3xl mx-auto space-y-4">
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                                            {message.sender === 'seller' && (
                                                <img
                                                    src={seller.avatar}
                                                    alt={seller.name}
                                                    className="w-8 h-8 rounded-full shrink-0"
                                                />
                                            )}

                                            <div className={`rounded-2xl px-4 py-2 ${
                                                message.sender === 'user' 
                                                    ? 'bg-green-500 text-white rounded-br-none' 
                                                    : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                                            }`}>
                                                {message.type === 'image' && message.imageUrl ? (
                                                    <div className="mb-1">
                                                        <img
                                                            src={message.imageUrl}
                                                            alt="Shared image"
                                                            className="rounded-lg max-w-full h-auto max-h-64 object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                                )}
                                                
                                                <div className={`flex items-center space-x-1 mt-1 ${
                                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                                }`}>
                                                    <span className={`text-xs ${
                                                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                                                    }`}>
                                                        {formatTime(message.timestamp)}
                                                    </span>
                                                    {message.sender === 'user' && (
                                                        <div className="ml-1">
                                                            {getStatusIcon(message.status)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Message Input - Fixed at bottom */}
                    <div className="bg-white border-t border-gray-200 p-4 shrink-0">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                                >
                                    <Smile size={24} />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                                >
                                    <Paperclip size={24} />
                                </motion.button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                <div className="flex-1 relative">
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message"
                                        rows={1}
                                        className="w-full px-4 py-3 pr-12 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none max-h-32 placeholder-gray-500"
                                        style={{ minHeight: '48px' }}
                                    />
                                </div>

                                <motion.button
                                    onClick={handleSendMessage}
                                    disabled={newMessage.trim() === ''}
                                    className={`p-3 rounded-full transition-all duration-200 ${
                                        newMessage.trim() === '' 
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                            : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                                    whileHover={newMessage.trim() !== '' ? { scale: 1.1 } : {}}
                                    whileTap={newMessage.trim() !== '' ? { scale: 0.9 } : {}}
                                >
                                    <Send size={20} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className={`${
                    activeView === 'location' ? 'flex' : 'hidden'
                } lg:flex flex-col flex-1 min-w-0 border-l border-gray-200`}>
                    {/* Scrollable Location Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                            <MapPin size={24} className="text-green-500" />
                            <span>Location & Directions</span>
                        </h3>

                        {/* Map Placeholder */}
                        <div className="bg-linear-to-br from-green-100 to-blue-100 rounded-2xl h-64 mb-6 flex items-center justify-center relative">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Navigation size={24} className="text-white" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Live Location Map</h4>
                                <p className="text-gray-600 text-sm">Interactive map will be integrated here</p>
                            </div>

                            <motion.div
                                className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                                    <User size={16} />
                                </div>
                                <p className="text-xs text-gray-600 mt-1 text-center">You</p>
                            </motion.div>

                            <motion.div
                                className="absolute right-1/4 top-1/2 transform -translate-y-1/2"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                                    <MapPin size={16} />
                                </div>
                                <p className="text-xs text-gray-600 mt-1 text-center">Seller</p>
                            </motion.div>

                        </div>

                        {/* Location Details */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <MapPin size={20} className="text-green-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-green-600">1.2 km</p>
                                    <p className="text-sm text-gray-600">Distance</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <ClockIcon size={20} className="text-green-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-green-600">15 min</p>
                                    <p className="text-sm text-gray-600">ETA</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;