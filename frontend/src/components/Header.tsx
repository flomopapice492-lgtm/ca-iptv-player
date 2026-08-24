import React from 'react';
import { FiMenu, FiX, FiMoon, FiSun, FiHome, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">📺</div>
            <h1 className="text-2xl font-bold text-red-600 hidden sm:block">
              CA IPTV Player
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-red-600 transition-colors"
            >
              <FiHome size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-1 hover:text-red-600 transition-colors"
            >
              <FiInfo size={20} />
              <span>About</span>
            </Link>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
