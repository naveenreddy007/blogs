import React, { useState } from 'react';
import { Home, UserPlus, LayoutDashboard, BookOpen, Trash2, PlusCircle, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-700 shadow-lg' : 'hover:bg-indigo-600';
  };

  const navItems = [
    { to: '/', icon: Home, text: 'Home' },
    { to: '/register', icon: UserPlus, text: 'Register' },
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/blog', icon: BookOpen, text: 'Blog' },
    { to: '/create-blog', icon: PlusCircle, text: 'Create Blog' },
    { to: '/delete-blog', icon: Trash2, text: 'Delete Blog' },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold">BlogApp</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(item.to)}`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive(item.to)}`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

