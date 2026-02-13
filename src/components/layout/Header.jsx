import React from 'react';
import { Menu, Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ toggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-dark-200 flex items-center justify-between px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 dark:text-dark-500 dark:hover:text-dark-700 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-dark-50 rounded-lg px-4 py-2 w-96">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members, trainers, classes..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-dark-700 placeholder-gray-400 dark:placeholder-dark-400 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-50 transition-colors text-gray-700 dark:text-dark-700"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-50 transition-colors text-gray-700 dark:text-dark-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-dark-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-dark-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary-500/30 cursor-pointer hover:scale-105 transition-transform">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
