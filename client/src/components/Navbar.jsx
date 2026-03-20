import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#" },
    { name: "Collections", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent hidden sm:inline">
                Vastralaya
              </span>
              <span className="text-2xl font-bold bg-linear-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent sm:hidden">
                V
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200">
              <ShoppingCart size={20} />
              <span className="absolute ml-1 -mt-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button className="p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 hidden sm:block">
              <User size={20} />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full mt-2 px-3 py-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 flex items-center space-x-2">
              <User size={18} />
              <span>My Account</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
