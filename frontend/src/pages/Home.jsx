export default function Home() {
  return (
    <div className="w-full">

      {/* HERO SECTION with Gradient */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="text-white text-sm font-medium">Est. January 2025 • IIT Kanpur</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Welcome to
            <span className="block mt-2 bg-linear-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Srajnik Lab
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-white/90 text-xl md:text-2xl font-light">
            Empowering young minds through innovation, robotics, and hands-on STEM education at Shiksha Sopan, Nankari
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="group bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
            >
              Explore Projects
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="/contact"
              className="border-2 border-white/60 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all hover:border-white"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>

      {/* MISSION SECTION with Split Layout */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-lg">
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Our Mission</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Building Tomorrow's
              <span className="text-blue-600"> Innovators</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              We empower underprivileged youth from Nankari village and beyond through hands-on training in robotics, embedded systems, and electronics—fostering innovation, problem-solving, and real-world skills that transform lives.
            </p>

            <div className="pt-4">
              <a href="/about" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                Learn more about us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform">
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <h3 className="font-bold text-lg">Hands-On Learning</h3>
              <p className="text-sm text-blue-100 mt-2">Learning by building real projects</p>
            </div>

            <div className="bg-linear-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform mt-8">
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 className="font-bold text-lg">Community First</h3>
              <p className="text-sm text-purple-100 mt-2">Empowering local communities</p>
            </div>

            <div className="bg-linear-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform">
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h3 className="font-bold text-lg">Innovation Hub</h3>
              <p className="text-sm text-orange-100 mt-2">Cutting-edge technology</p>
            </div>

            <div className="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform mt-8">
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
              <h3 className="font-bold text-lg">Quality Mentorship</h3>
              <p className="text-sm text-green-100 mt-2">Expert guidance & support</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION with Modern Design */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact in Numbers</h2>
            <p className="text-gray-400 mt-3">Making a difference, one project at a time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group relative bg-linear-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-6xl font-extrabold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">50+</div>
                <p className="mt-4 text-gray-300 font-medium text-lg">Hands-on Projects</p>
                <p className="text-sm text-gray-500 mt-2">Innovative solutions built</p>
              </div>
            </div>

            <div className="group relative bg-linear-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-6xl font-extrabold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">15+</div>
                <p className="mt-4 text-gray-300 font-medium text-lg">Workshops Conducted</p>
                <p className="text-sm text-gray-500 mt-2">Interactive learning sessions</p>
              </div>
            </div>

            <div className="group relative bg-linear-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition-all hover:shadow-2xl hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-6xl font-extrabold bg-linear-to-r from-green-400 to-green-600 bg-clip-text text-transparent">100+</div>
                <p className="mt-4 text-gray-300 font-medium text-lg">Students Impacted</p>
                <p className="text-sm text-gray-500 mt-2">Lives transformed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS with Feature Cards */}
      <section className="py-20 px-6 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-lg mb-4">
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Lab Highlights
            </h2>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              Explore the exciting areas of STEM we focus on
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Robotics & Automation",
                items: ["Embedded robotics projects", "Autonomous systems", "Smart automation"],
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                color: "blue"
              },
              { 
                title: "Aerial Systems",
                items: ["Drone development", "Fixed-wing aircraft", "Flight controllers"],
                icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
                color: "purple"
              },
              { 
                title: "IoT & Electronics",
                items: ["ESP32 innovations", "Arduino projects", "Sensor networks"],
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                color: "green"
              },
              { 
                title: "Collaborative Learning",
                items: ["Peer mentoring", "Workshop series", "Community projects"],
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                color: "orange"
              }
            ].map((feature, idx) => (
              <div key={idx} className={`group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-${feature.color}-500 hover:-translate-y-2`}>
                <div className={`w-14 h-14 bg-linear-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-start gap-2">
                      <svg className={`w-5 h-5 text-${feature.color}-500 shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-linear-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Our Journey?
          </h2>
          <p className="text-blue-100 text-xl mb-10">
            Be part of a community that's shaping the future through innovation and education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/team" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg inline-flex items-center justify-center gap-2">
              Meet Our Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <a href="/resources" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
              Explore Resources
            </a>
          </div>
        </div>
      </section>

      {/* CSS for animations - inline styles */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

    </div>
  );
}
