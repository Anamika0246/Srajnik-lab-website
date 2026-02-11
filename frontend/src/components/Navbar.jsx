import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Srajnik Lab
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/team" className="hover:text-blue-600 transition-colors">Team</Link>
          <Link to="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
          <Link to="/gallery" className="hover:text-blue-600 transition-colors">Gallery</Link>
          <Link to="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
          <Link to="/news" className="hover:text-blue-600 transition-colors">News</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          
          {/* Auth Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">{user.name}</span>
                <svg className={`w-4 h-4 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                    {isAdmin && (
                      <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs rounded-full font-semibold">
                        Admin
                      </span>
                    )}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setProfileDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Admin Dashboard
                      </div>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      My Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4 text-gray-700 border-t border-gray-100">
          <Link to="/team" onClick={() => setOpen(false)} className="hover:text-blue-600 py-2">Team</Link>
          <Link to="/projects" onClick={() => setOpen(false)} className="hover:text-blue-600 py-2">Projects</Link>
          <Link to="/gallery" onClick={() => setOpen(false)} className="hover:text-blue-600 py-2">Gallery</Link>
          <Link to="/resources" onClick={() => setOpen(false)} className="hover:text-blue-600 py-2">Resources</Link>
          <Link to="/news" onClick={() => setOpen(false)} className="hover:text-blue-600 py-2">News</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-blue-600 py-2">Contact</Link>
          
          {/* Mobile Auth Section */}
          {user ? (
            <>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="block py-2 px-4 bg-orange-50 text-orange-600 rounded-lg mb-2 font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block py-2 hover:text-blue-600"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
