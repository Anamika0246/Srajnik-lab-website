import React, { useState } from 'react'

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const resources = [
    {
      id: 1,
      title: "Arduino Programming Guide",
      description: "Comprehensive guide to Arduino programming for beginners. Learn the basics of microcontroller programming.",
      category: "Tutorial",
      link: "https://www.arduino.cc/en/Guide",
      author: "Arduino Team",
      difficulty: "Beginner",
      tags: ["Arduino", "Electronics", "Programming"]
    },
    {
      id: 2,
      title: "Python for Robotics",
      description: "Complete course on using Python for robotics applications, including ROS and computer vision.",
      category: "Course",
      link: "https://www.coursera.org/learn/robotics",
      author: "Coursera",
      difficulty: "Intermediate",
      tags: ["Python", "Robotics", "ROS", "AI"]
    },
    {
      id: 3,
      title: "PCB Design Basics",
      description: "Learn how to design your own PCBs using free tools like KiCad and EasyEDA.",
      category: "Video",
      link: "https://www.youtube.com/watch?v=PCB_Design",
      author: "Electronics Hub",
      difficulty: "Beginner",
      tags: ["PCB", "Electronics", "Design"]
    },
    {
      id: 4,
      title: "Raspberry Pi Projects Handbook",
      description: "Collection of 50+ Raspberry Pi projects with detailed instructions and code.",
      category: "PDF",
      link: "https://magpi.raspberrypi.org/books/projects",
      author: "MagPi Magazine",
      difficulty: "All Levels",
      tags: ["Raspberry Pi", "Projects", "IoT"]
    },
    {
      id: 5,
      title: "Introduction to Drone Technology",
      description: "Understanding UAV systems, flight controllers, and autonomous navigation.",
      category: "Article",
      link: "https://dronestech.com/intro",
      author: "DronesTech",
      difficulty: "Beginner",
      tags: ["Drones", "UAV", "Autonomous Systems"]
    },
    {
      id: 6,
      title: "3D Printing for Makers",
      description: "Complete guide to 3D printing, from design to printing and post-processing.",
      category: "Documentation",
      link: "https://www.3dprinting.com/guide",
      author: "3D Printing Community",
      difficulty: "Beginner",
      tags: ["3D Printing", "CAD", "Manufacturing"]
    },
    {
      id: 7,
      title: "Advanced ESP32 Projects",
      description: "Deep dive into ESP32 microcontroller with IoT projects and WiFi applications.",
      category: "Tutorial",
      link: "https://randomnerdtutorials.com/esp32",
      author: "Random Nerd Tutorials",
      difficulty: "Advanced",
      tags: ["ESP32", "IoT", "WiFi", "Sensors"]
    },
    {
      id: 8,
      title: "Machine Learning for Robotics",
      description: "Apply machine learning algorithms to robotics and autonomous systems.",
      category: "Course",
      link: "https://www.udacity.com/course/ml-robotics",
      author: "Udacity",
      difficulty: "Advanced",
      tags: ["Machine Learning", "AI", "Robotics"]
    }
  ];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{getCategoryIcon(resource.category)}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, index) => (
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

        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No resources found in this category</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Resources
