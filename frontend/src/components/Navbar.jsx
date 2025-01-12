import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, Menu, MessageSquare, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800
    fixed w-full top-0 z-40 backdrop-blur-lg shadow-md transition-colors"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src="/icon_app.jpeg"
                  alt="EasyChat Logo"
                />
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                EasyChat
              </h1>
            </Link>
          </div>

          {/* Center: Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 
            dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu className="size-6" />
          </button>

          {/* Right: Desktop Navigation */}
          <div
            className={`lg:flex items-center gap-4 ${
              menuOpen ? 'block' : 'hidden'
            }`}
          >
            <Link
              to="/settings"
              className="btn btn-sm gap-2 transition-colors bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={profileMenuOpen}
                  >
                    {authUser?.profilePic ? (
                      <div className="avatar">
                        <div className="size-10 rounded-full ring-2 ring-primary">
                          <img
                            src={authUser.profilePic}
                            alt="profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <User className="size-7 text-gray-700 dark:text-gray-300 rounded-full" />
                    )}
                  </button>

                  {profileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border 
                      border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50"
                      role="menu"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 
                        dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
