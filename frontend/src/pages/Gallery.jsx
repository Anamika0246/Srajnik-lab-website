import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/gallery');
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError('Failed to load gallery images');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const categories = ['All', 'Workshops', 'Events', 'Projects', 'Lab'];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
            <span className="text-sm font-medium">Visual Journey</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Capturing moments of innovation, learning, and collaboration at Srajnik Lab
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No images available in this category yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <div
                key={image._id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImage(image)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>

                {/* Category Badge (visible always) */}
                <div className="absolute top-4 right-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div className="max-w-5xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-300 text-lg mb-4">{selectedImage.description}</p>
              <span className="inline-block px-4 py-2 bg-blue-600 rounded-full text-sm font-semibold">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-extrabold mb-2">500+</div>
              <div className="text-blue-100">Photos Captured</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">50+</div>
              <div className="text-blue-100">Events Documented</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">100+</div>
              <div className="text-blue-100">Projects Showcased</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">1000+</div>
              <div className="text-blue-100">Memories Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Gallery
