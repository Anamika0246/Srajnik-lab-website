import React from 'react'
import TeamMemberCard from '../components/TeamMemberCard'

const Team = () => {
  // Lab Head
  const labHead = {
    name: "Dr. Rajesh Kumar",
    role: "Lab Director & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "PhD in Robotics from IIT Kanpur. Passionate about making STEM education accessible to underprivileged communities. Founded Srajnik Lab in 2025 with a vision to empower youth through hands-on technology learning.",
    skills: ["Robotics", "Embedded Systems", "STEM Education", "Community Development"],
    email: "rajesh@srajniklab.org",
    linkedin: "https://linkedin.com/in/rajeshkumar",
    github: "https://github.com/rajeshkumar"
  };

  // Team Members
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Electronics Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Electronics enthusiast with expertise in circuit design and PCB development. Leads workshops on Arduino and ESP32 projects, helping students bring their ideas to life.",
      skills: ["Circuit Design", "PCB Design", "Arduino", "ESP32", "IoT"],
      email: "priya@srajniklab.org",
      linkedin: "https://linkedin.com/in/priyasharma",
      github: "https://github.com/priyasharma"
    },
    {
      name: "Arjun Patel",
      role: "Robotics Mentor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Mechanical engineering student with a passion for robotics. Specializes in autonomous systems and has built multiple prize-winning robots for competitions.",
      skills: ["Autonomous Robots", "Mechanical Design", "ROS", "Computer Vision"],
      email: "arjun@srajniklab.org",
      linkedin: "https://linkedin.com/in/arjunpatel",
      github: "https://github.com/arjunpatel"
    },
    {
      name: "Sneha Reddy",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Full-stack developer who teaches programming and web development. Creates interactive dashboards for IoT projects and maintains the lab's digital infrastructure.",
      skills: ["Python", "JavaScript", "Web Development", "Data Visualization"],
      email: "sneha@srajniklab.org",
      linkedin: "https://linkedin.com/in/snehareddy",
      github: "https://github.com/snehareddy"
    },
    {
      name: "Vikram Singh",
      role: "Drone Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Aerospace engineering graduate with deep knowledge of UAVs and flight systems. Conducts drone building workshops and teaches flight dynamics to students.",
      skills: ["UAV Design", "Flight Controllers", "Aerodynamics", "GPS Navigation"],
      email: "vikram@srajniklab.org",
      linkedin: "https://linkedin.com/in/vikramsingh",
      github: "https://github.com/vikramsingh"
    },
    {
      name: "Ananya Gupta",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      bio: "Dedicated to building strong connections with the community. Organizes events, manages outreach programs, and ensures every student feels welcomed and supported.",
      skills: ["Event Management", "Community Outreach", "Project Coordination", "Social Media"],
      email: "ananya@srajniklab.org",
      linkedin: "https://linkedin.com/in/ananyagupta",
      github: "https://github.com/ananyagupta"
    },
    {
      name: "Rahul Verma",
      role: "Technical Advisor",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Industry veteran with 10+ years of experience in embedded systems. Provides technical guidance and helps students understand real-world applications of their projects.",
      skills: ["Embedded Systems", "Firmware Development", "System Architecture", "Mentorship"],
      email: "rahul@srajniklab.org",
      linkedin: "https://linkedin.com/in/rahulverma",
      github: "https://github.com/rahulverma"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
            <span className="text-sm font-medium">The People Behind Innovation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Dedicated mentors, engineers, and educators working together to empower the next generation of innovators
          </p>
        </div>
      </section>

      {/* Lab Head Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Leader</h2>
          <p className="text-gray-600 text-lg">Guiding the vision of Srajnik Lab</p>
        </div>
        
        <div className="flex justify-center mb-32">
          <TeamMemberCard member={labHead} isLead={true} />
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-20">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
          <div className="mx-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
            <span className="text-white text-sm font-semibold">Our Core Team</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-blue-100 text-xl mb-10">
            We're always looking for passionate individuals who want to make a difference in STEM education
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* CSS for scroll animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Team

