import React from 'react'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  // Hardcoded project data
  const projects = [
    {
      id: 1,
      title: "Autonomous Line Following Robot",
      description: "A smart robot built with Arduino that follows black lines using IR sensors. Features PID control for smooth navigation and obstacle detection. Perfect for beginners learning robotics fundamentals.",
      category: "Robotics",
      technologies: ["Arduino", "IR Sensors", "PID Control", "C++"],
      date: "Jan 2025",
      image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/line-following-robot"
    },
    {
      id: 2,
      title: "ESP32 Weather Station",
      description: "IoT-based weather monitoring system using ESP32 microcontroller. Collects temperature, humidity, and pressure data and displays it on a web dashboard in real-time.",
      category: "IoT",
      technologies: ["ESP32", "DHT22", "BMP280", "MQTT", "Web Server"],
      date: "Dec 2024",
      image: "https://images.unsplash.com/photo-1592833159057-48b19f76c7e1?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/esp32-weather-station"
    },
    {
      id: 3,
      title: "Quadcopter Drone Build",
      description: "Custom-built quadcopter drone with flight controller programming. Includes GPS navigation, altitude hold, and return-to-home features. Students learn drone mechanics and flight dynamics.",
      category: "Aerial Systems",
      technologies: ["Flight Controller", "GPS", "ESC", "Brushless Motors"],
      date: "Nov 2024",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/quadcopter-drone"
    },
    {
      id: 4,
      title: "Smart Home Automation",
      description: "Complete home automation system using ESP8266 and Blynk app. Control lights, fans, and appliances remotely. Features voice control integration with Google Assistant.",
      category: "IoT",
      technologies: ["ESP8266", "Blynk", "Relay Module", "Google Assistant"],
      date: "Oct 2024",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/smart-home-automation"
    },
    {
      id: 5,
      title: "Robotic Arm with Gesture Control",
      description: "6-DOF robotic arm controlled by hand gestures using accelerometer sensors. Students learn inverse kinematics, servo control, and wireless communication protocols.",
      category: "Robotics",
      technologies: ["Arduino", "MPU6050", "Servo Motors", "nRF24L01"],
      date: "Sep 2024",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/gesture-robotic-arm"
    },
    {
      id: 6,
      title: "Solar Panel Sun Tracker",
      description: "Automated solar panel tracking system that follows the sun's position for maximum energy efficiency. Uses LDR sensors and servo motors for dual-axis tracking.",
      category: "Automation",
      technologies: ["Arduino", "LDR Sensors", "Servo Motors", "Solar Panels"],
      date: "Aug 2024",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/solar-tracker"
    },
    {
      id: 7,
      title: "Bluetooth Controlled Car",
      description: "Mobile-controlled robot car using Bluetooth communication. Features obstacle avoidance, speed control, and LED indicators. Great introductory project for wireless robotics.",
      category: "Robotics",
      technologies: ["Arduino", "HC-05", "L298N", "Ultrasonic Sensor"],
      date: "Jul 2024",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      githubLink: "https://github.com/srajniklab/bluetooth-car"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
            <span className="text-sm font-medium">Innovation in Action</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore the innovative projects built by students at Srajnik Lab. From robotics to IoT, each project represents hands-on learning and real-world problem solving.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Want to Build Your Own Project?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join our lab and start creating amazing projects with guidance from experienced mentors.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  )
}

export default Projects

