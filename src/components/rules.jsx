'use client';
import React, { useRef } from 'react';
import { TimerIcon, Verified, Hammer } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        title:"Honest Hackatime",
        description:"Track your coding using hackatime, but no fabricated heartbeats or any type of hour inflation, don't worry we will know :))",
        icon: <TimerIcon className="h-12 w-12" />
    },
    {
        title:"A finished project",
        description:"Your project must have a readme, demo link and open source",
        icon: <Verified className="h-12 w-12" />
    },
    {
        title:"No AI Slop",
        description:"AI use is forbidden and we won't accept any vibecoded projects, you can still use it as an assistant but just less than 30% of your project",
        icon: <Hammer className="h-12 w-12" />
    }
];

export default function RulesSection(){
    const container = useRef(null)
    const cards = useRef([]);

    useGSAP(() => {

        cards.current.forEach((card, index) => {
            gsap.set(card, {
                y: index * 20, 
                scale: 1 - index * 0.05,
                opacity: index === 0 ? 1 : 0.4,
            });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                start: "top top",
                end: "+=3000",
                scrub: 1,
            }
        });


        tl.from(".rules-heading", {
            autoAlpha: 0,
            y: -50,
            ease: "power2.out"
        }, 0); 

        tl.to(cards.current[0], {
            x: "-110%",
            rotation: -8, 
            ease: "power2.inOut",
        }, ">-0.2"); 
        tl.to(cards.current[1], {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.inOut",
        }, "<");

        tl.to(cards.current[1], {
            x: "0%",
            rotation: 0,
            ease: "power2.inOut",
        }, ">+0.5"); 

        tl.to(cards.current[2], {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.inOut",
        }, "<");


        tl.to(cards.current[2], {
            x: "110%",
            rotation: 8,
            ease: "power2.inOut",
        }, ">+0.5");


    }, { scope: container });

    return (
        <div id='rules' ref={container} className="rules-section min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
            
            <h2 className='rules-heading text-6xl font-bold mb-24 text-center text-blue-800'>Rules</h2>
            
            <div className='relative w-full max-w-sm h-96 [perspective:1000px]'>
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        ref={el => cards.current[index] = el}
                        className='rule-card absolute inset-0  backdrop-blur-md border border-blue-800/50 rounded-lg shadow-2xl p-6 flex flex-col items-center text-center'
                    >
                        <div className='text-blue-400 mb-4'>{item.icon}</div>
                        <h3 className='text-xl font-semibold mb-2 text-gray-900'>{item.title}</h3>
                        <p className='text-gray-900'>{item.description}</p>
                    </div>
                ))}
            </div> 
        </div>
    );
}

