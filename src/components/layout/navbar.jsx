'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoRestaurantOutline, IoListCircleOutline, IoHelpCircleOutline } from "react-icons/io5";
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';


const navLinks = [
  { name: 'How It Works', href: '#how-it-works', icon: IoRestaurantOutline },
  { name: 'Rules', href: '#rules', icon: IoListCircleOutline },
  { name: 'FAQ', href: '#faq', icon: IoHelpCircleOutline },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: '-100%',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.08 
      }
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <motion.div
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/e4fa304e4c87fe02122d84851f4fe60d04216443_image.png" 
                alt="Foodie Logo"
                className='h-16 w-auto drop-shadow-lg'
              />
              <span className="text-4xl font-extrabold tracking-tight drop-shadow-md bg-gradient-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent">
                Foodie 
              </span>
            </Link>
          </motion.div>

          <div 
            className="hidden md:flex items-center space-x-2 bg-white/60 p-2 rounded-full shadow-inner"
            onMouseLeave={() => setHoveredLink(null)} 
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-300 z-10"
                onMouseEnter={() => setHoveredLink(link.name)}
              >
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="hover-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <link.icon className="text-blue-500"/>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:block">
            <motion.a
              href="#"
              className="font-bold py-3 px-8 rounded-full shadow-lg text-white bg-gradient-to-r from-blue-500 to-sky-500"
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 10px 20px -5px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              RSVP
            </motion.a>
          </div>

          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-800"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >

              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'times' : 'bars'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={mobileLinkVariants}
                  
                  className="flex items-center justify-center gap-3 text-slate-800 hover:bg-blue-100/50 px-3 py-4 rounded-lg text-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="text-blue-500" />
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={mobileLinkVariants} className="pt-4 px-5">
                 <a
                  href="#"
                  className="block text-center w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold py-4 rounded-full shadow-md active:scale-95 transform transition-transform duration-200"
                >
                  RSVP
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

