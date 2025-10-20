'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaClock, FaClipboardCheck, FaGift } from 'react-icons/fa';

const howItWorksSteps = [
    {
        icon: <FaLightbulb />,
        title: "Cock up an idea",
        description: "Got a delicious idea for a food-themed game, website, or recipe tool? Then go build it"
    },
    {
        icon: <FaClock />,
        title: "Track the Hours",
        description: "You must use HackTime to track your coding hours"
    },
    {
        icon: <FaClipboardCheck />,
        title: "Submit your project",
        description: "Your project is shipped and finally done and also over 3 hours, go submit it"
    },
    {
        icon: <FaGift />,
        title: "Redeeme your deliscous food",
        description: "For every approved hour, you earn a $5 grant to spend on the most delicious food."
    }
];

const ROTATION_INTERVAL = 3000;

export default function HowItWorksSection() {
    const [rotation, setRotation] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prevRotation) => prevRotation + 135);
            setActiveIndex((prevIndex) => (prevIndex + 1) % howItWorksSteps.length);
        }, ROTATION_INTERVAL);
        return () => clearInterval(interval);
    })

    const activeStep = howItWorksSteps[activeIndex];

    return (
        <div id='how-it-works' className="  min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900">
                    The Process :)
                </h2>
                <p className="mt-4 text-lg text-slate-900 max-w-2xl mx-auto">
                    Here's how you turn your 0s & 1s into a delecuios meal
                </p>
            </div>

            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
                
                <div className="flex justify-center items-center">
                    <motion.div
                        className="w-64 h-64 md:w-80 md:h-80"
                        animate={{ rotate: rotation }}
                        transition={{ duration: 1, ease: 'easeInOut' }} 
                    >
                        <img 
                          src="/pizza.png" 
                          alt="Spinning Pizza" 
                          className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                </div>

                <div className="relative h-56 flex flex-col justify-center text-center md:text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <span className="text-4xl text-blue-900">{activeStep.icon}</span>
                                <h3 className="text-3xl font-bold text-blue-900">
                                    {activeStep.title}
                                </h3>
                            </div>
                            <p className="text-lg text-slate-900 leading-relaxed max-w-md mx-auto md:mx-0">
                                {activeStep.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

