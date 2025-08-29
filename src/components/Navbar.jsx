import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 z-50 py-4">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <Heart size={32} className="text-blue-500" />
          <div>
            <h1 className="text-white text-2xl font-bold">SmartIV Monitor</h1>
            <p className="text-slate-400 text-xs">Rwanda Healthcare Network</p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Home
          </a>
          <a href="#features" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Features
          </a>
          <a href="#benefits" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Benefits
          </a>
          <a href="#about" className="text-slate-300 font-medium hover:text-blue-500 transition">
            About
          </a>
          <a href="#contact" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Contact
          </a>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={() => navigate('/login')}
          >
            Access Dashboard
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 focus:outline-none text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 px-6 flex flex-col gap-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/50 pb-4">
          <a href="#home" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Home
          </a>
          <a href="#features" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Features
          </a>
          <a href="#benefits" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Benefits
          </a>
          <a href="#about" className="text-slate-300 font-medium hover:text-blue-500 transition">
            About
          </a>
          <a href="#contact" className="text-slate-300 font-medium hover:text-blue-500 transition">
            Contact
          </a>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={() => navigate('/login')}
          >
            Access Dashboard
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
