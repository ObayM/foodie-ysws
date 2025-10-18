'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'How It Works', href: '#' },
    { name: 'Requirements', href: '#' },
    { name: 'FAQ', href: '#' },
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: 'easeInOut',
        staggerChildren: 0.1 
      }
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <nav className="shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link href="" className="flex items-center space-x-3">
              <img 
                src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/e4fa304e4c87fe02122d84851f4fe60d04216443_image.png" 
                alt="Foodie Logo"
                className='h-14 w-auto drop-shadow-lg'
              />
              <span className=" text-3xl font-bold tracking-wider drop-shadow-md text-blue-700">
                Foodie
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className=" hover:text-slate-800 font-semibold transition-colors duration-300 px-4 py-2 rounded-md relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
              </motion.a>
            ))}
          </div>
          
          <div className="hidden md:block">
            <motion.a
              href="#"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Submit
            </motion.a>
          </div>

          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-900"
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
                  {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-2 pt-2 pb-6 space-y-2 sm:px-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={linkVariants}
                  className="text-slate-900 hover:text-black hover:bg-white/10 block px-3 py-3 rounded-md text-base font-semibold text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={linkVariants} className="pt-6 px-5">
                 <a
                  href="forms.hackclub.com"
                  className="block text-center w-full bg-blue-900 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-blue-800 active:scale-95 transform transition-all duration-300 ease-in-out"
                >
                  Submit
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