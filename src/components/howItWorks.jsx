'use client'

import React, { useRef } from 'react';
import { FaLightbulb, FaClock, FaClipboardCheck, FaGift } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
        description: "Your project is shipped and fully working and also over 3 hours, go submit it"
    },
    {
        icon: <FaGift />,
        title: "Redeem your delicious food",
        description: "For every approved hour, you earn a $5 grant to spend on the most delicious food."
    }
];

export default function HowItWorksSection() {
    const container = useRef(null);

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                start: "top top",
                end: "+=5000",
                scrub: 1,
            }
        });

        const steps = gsap.utils.toArray('.step-text');
        const totalRotation = 990;

        const rotationPerStep = totalRotation / (steps.length - 1); 


        steps.forEach((step, index) => {

            if (index > 0) {

                tl.to(steps[index - 1], {
                    autoAlpha: 0,
                    y: -20,
                    duration:3.5,
                    ease: "power2.inOut"
                })

                .fromTo(step, {
                    autoAlpha: 0,
                    y: 20
                }, {
                    
                    autoAlpha: 1,
                    y: 0,
                    duration: 3.5,
                    ease: "power2.inOut"
                }, "<") 

                .to(".pizza-image", {
                    rotate: `+=${rotationPerStep}`,
                    duration: 3.5,
                    ease: "power2.inOut"
                }, "<"); 
            }
        });

        tl.to({}, { duration: 3 });

    }, { scope: container });

    return (
        <div id='how-it-works' ref={container} className="min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900">
                    The Process :)
                </h2>
                <p className="mt-4 text-lg text-slate-900 max-w-2xl mx-auto">
                    Here's how you turn your 0s & 1s into a delicious meal
                </p>
            </div>

            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
                
                <div className="flex justify-center items-center">
                    <div className="pizza-image w-64 h-64 md:w-80 md:h-80">
                        <img
                          src="/pizza.png" 
                          alt="Spinning Pizza" 
                          className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="relative h-56 flex flex-col justify-center text-center md:text-left">
                    {howItWorksSteps.map((step, index) => (
                        <div
                            key={index}
                            className="step-text absolute w-full bg-blue-50/60 p-8 rounded-xl shadow-lg "
                            style={{ visibility: index === 0 ? 'visible' : 'hidden', opacity: index === 0 ? 1 : 0 }}
                        >
                            <div className="flex items-start justify-center md:justify-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-xl">
                                    {index + 1}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl text-blue-900">{step.icon}</span>
                                        <h3 className="text-4xl font-bold text-blue-900">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="mt-2 text-xl text-slate-900 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

