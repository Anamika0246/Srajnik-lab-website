import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/resources');
      setResources(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Failed to load resources');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading resources...</p>
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

  const categories = ['All', 'Tutorial', 'Course', 'Video', 'PDF', 'Documentation', 'Article'];

  const filteredResources = activeCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Tutorial': return '📖';
      case 'Course': return '🎓';
      case 'Video': return '🎥';
      case 'PDF': return '📄';
      case 'Documentation': return '📚';
      case 'Article': return '📝';
      default: return '📌';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
            <span className="text-sm font-medium">Learning Materials & Guides</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Learning Resources
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Curated collection of tutorials, courses, and documentation to help you learn and build amazing projects
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No resources available in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{getCategoryIcon(resource.category)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags && resource.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">{resource.category}</span>
                    {resource.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{resource.author}</span>
                      </>
                    )}
                  </div>
                </div>

                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-block text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Access Resource →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Resources
