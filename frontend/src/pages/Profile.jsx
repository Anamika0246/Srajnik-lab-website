import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    mobileNumber: user?.mobileNumber || '',
    address: user?.address || '',
    gender: user?.gender || ''
  });

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await updateProfile(formData);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age || '',
      mobileNumber: user?.mobileNumber || '',
      address: user?.address || '',
      gender: user?.gender || ''
    });
    setIsEditing(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
            <span className="text-sm font-medium">My Account</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            User Profile
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Manage your personal information and account settings
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-blue-100 text-lg">@{user.username}</p>
                {user.isAdmin && (
                  <span className="inline-block mt-2 px-4 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm rounded-full font-semibold">
                    Administrator
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="mx-8 mt-8 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mx-8 mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Profile Information */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Full Name</label>
                    <p className="text-lg text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Username</label>
                    <p className="text-lg text-gray-900">@{user.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Age</label>
                    <p className="text-lg text-gray-900">{user.age || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Mobile Number</label>
                    <p className="text-lg text-gray-900">{user.mobileNumber || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Gender</label>
                    <p className="text-lg text-gray-900 capitalize">{user.gender || 'Not specified'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Address</label>
                    <p className="text-lg text-gray-900">{user.address || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="1"
                      max="150"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-700">Account Type</p>
                <p className="text-lg font-bold text-gray-900">
                  {user.isAdmin ? 'Administrator' : 'Standard User'}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
