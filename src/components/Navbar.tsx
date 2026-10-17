import React from 'react';
import Logo from './ui/logo.tsx';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#800000]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Logo size={28} className="text-[#800000]" />
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-base uppercase text-[#800000] leading-none">
              Sensori
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#800000]/70 font-semibold mt-0.5">
              Powered by Sensora
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider text-[#800000] font-semibold">
          <a
            href="https://www.sensora.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 transition-colors"
          >
            www.sensora.co.in
          </a>
          <span className="text-[#800000]/30">•</span>
          <a
            href="https://www.gifting.sensora.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 transition-colors"
          >
            www.gifting.sensora.co.in
          </a>
        </div>

        <a
          href="https://wa.me/918356918580?text=Hi%20Sensori%2C%20I%20would%20like%20to%20inquire%20about%20Diwali%20Hampers"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#800000] text-white rounded hover:bg-[#800000]/90 transition-all shadow-sm"
        >
          Call / WhatsApp +91 83569 18580
        </a>
      </div>
    </header>
  );
};

export default Navbar;
