import React from 'react';
import { FaLightbulb, FaClock, FaClipboardCheck, FaGift } from 'react-icons/fa';

const howItWorksSteps = [
    {
        title: "Cook up an idea",
        description: "Got a delicious idea for a food-themed game, website, or recipe tool? Then go build it"
    },
    {
        icon: <FaClock />,
        title: "Track your time",
        description: "You must use HackTime to track your coding hours."
    },
    {
        icon: <FaClipboardCheck />,
        title: "Submit your project",
        description: "Your project is shipped and finally done and also over 3 hours, go submit it"
    },
    {
        icon: <FaGift />,
        title: "Rdeeme your delecious food",
        description: "For every hour you code, you'll earn a $5 grant that you can buy some delecious food with them"
    }
];

export default function HowItWorksSection() {
    return (
        <div className="min-h-screen flex items-center justify-center py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900">
                        How it works :)
                    </h2>
                    <p className="mt-4 text-lg text-slate-800 max-w-2xl mx-auto">
                        Follow these four simple steps to turn your code into delicious rewards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorksSteps.map((step, index) => (
                        <div 
                            key={index}
                            className="group bg-blue-200/30 backdrop-blur-sm border border-blue-400 rounded-2xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/20"
                        >


                            <h3 className="mb-2 text-2xl font-bold text-blue-900">
                                {step.title}
                            </h3>

                            <p className="text-black leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}