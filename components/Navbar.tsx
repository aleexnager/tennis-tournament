"use client";

import React, { useState } from "react";
import { navLinks } from "@/lib/config/constants";
import { motion } from "framer-motion";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Variants for Framer Motion animation
  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3, // Faster duration for menu animation
        when: "beforeChildren",
        staggerChildren: 0.07, // Faster stagger for children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="flex justify-center mt-10 z-20">
      <nav className="relative flex items-center justify-between sm:justify-center p-1 rounded-full w-11/12 md:w-1/3 h-16 sm:bg-gradient-to-r from-primary to-secondary">
        {/* Botón del menú en pantallas pequeñas */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-3 bg-gradient-to-r from-primary to-secondary rounded-full"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-bg" />
          ) : (
            <Bars2Icon className="w-6 h-6 text-bg" />
          )}
        </button>

        {/* Menú para pantallas grandes */}
        <motion.div className="hidden sm:flex items-center justify-center bg-bg rounded-full w-full h-full">
          <ul className="flex justify-between w-full px-8">
            {navLinks.map((link) => (
              <motion.li
                className="font-semibold text-lg hover:underline transition duration-300"
                key={link.title}
                whileHover={{ scale: 1.1 }}
              >
                <a href={link.path}>{link.title}</a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Menú desplegable hacia abajo en pantallas pequeñas con animación */}
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-bg shadow-lg rounded-xl border-2 border-accent sm:hidden "
            variants={menuVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.ul className="flex flex-col justify-center items-center w-full px-4 py-4">
              {navLinks.map((link) => (
                <motion.li
                  className="font-semibold text-lg hover:underline transition duration-300 my-2"
                  key={link.title}
                  variants={itemVariants}
                >
                  <a href={link.path}>{link.title}</a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
