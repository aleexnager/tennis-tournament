"use client";

import { motion } from "framer-motion";
import { version } from "../lib/config/constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer border z-10 border-t-text border-l-transparent border-r-transparent">
      <div className="p-12 flex flex-row justify-between lg:grid lg:grid-cols-3 items-center w-full">
        <div className="grid grid-row-2 gap-1 text-left">
          <p>
            Copyright © | Universidad Politécnica de Madrid (UPM).
            <br />
          </p>
          <p className="text-text lg:hidden">{version}</p>
        </div>

        <p className="hidden lg:block lg:text-center">{version}</p>

        <div className="flex justify-end">
          <motion.button
            onClick={scrollToTop}
            whileTap={{ scale: 0.7 }}
            transition={{ scale: { duration: 0.2 } }}
            className="w-14 h-14 p-3 flex items-center justify-center bg-primary text-accent font-semibold rounded-xl"
          >
            <svg
              className="w-7 h-7 z-20 text-bg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v13m0-13 4 4m-4-4-4 4"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
