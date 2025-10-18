'use client'

import React from 'react';
import { motion} from 'framer-motion';
import { ArrowRight } from 'lucide-react';


const HeroSection = () => {

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
        visible: { 
            y: 0, 
            opacity: 1, 
            filter: 'blur(0px)',
            transition: { type: 'spring', stiffness: 100, damping: 15 } 
        },
    };


    return (
        <div 
            className="relative flex items-center justify-center w-full min-h-[calc(100vh-64px)] overflow-hidden"
        >



            <motion.div
                className="z-10 flex flex-col items-center text-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-blue-600 tracking-widest">WELCOME TO</span>
                </motion.div>
                
                <motion.h1 
                    variants={itemVariants}
                    className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-blue-600"
                    style={{ textShadow: '4px 4px 0px rgba(255, 220, 179, 1)' }}
                >
                    foodie
                </motion.h1>

                <motion.p 
                    variants={itemVariants}
                    className="mt-4 max-w-2xl text-lg md:text-2xl font-medium text-slate-700"
                >
                    Build a food-related website/app, get 
                    <strong className="relative inline-block text-white font-bold px-2 py-1 mx-0.5">
                    <span className="relative z-10">$5 for every hour</span>
                    <span className="absolute inset-0 bg-red-600/40 rounded-md rotate-[-1deg]"></span>
                    </strong>
                    you spent on it!
                </motion.p>
                
                <motion.button
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.05, 
                        rotate: -2.5, 
                        boxShadow: '0px 15px 30px -10px rgba(234, 88, 12, 0.4)',
                        transition: { type: 'spring', stiffness: 300, damping: 10 }
                    }}
                    whileTap={{ 
                        scale: 0.95,
                        rotate: 2.5,
                    }}
                    className="flex items-center gap-3 mt-10 px-8 py-4 text-xl font-bold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    RSVP now!
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default HeroSection;