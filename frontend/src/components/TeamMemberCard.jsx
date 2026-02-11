import { useState } from "react";

export default function TeamMemberCard({ member, isLead = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${isHovered ? 'z-50' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Container - expands on hover */}
      <div className={`relative mx-auto transition-all duration-500 ease-out ${
        isHovered 
          ? (isLead ? 'w-[400px]' : 'w-[380px]')
          : (isLead ? 'w-52' : 'w-40')
      }`}>
        
        {/* Circle Image - shrinks and moves to top on hover */}
        <div className={`relative mx-auto transition-all duration-500 ${
          isLead ? 'w-52 h-52' : 'w-40 h-40'
        } ${isHovered ? 'scale-50 -mb-16' : 'scale-100'}`}>
          {/* Outer Ring Animation */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isHovered ? 'animate-spin-slow' : ''
          }`}></div>
          
          {/* White Ring */}
          <div className="absolute inset-1 bg-white rounded-full"></div>
          
          {/* Image */}
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-2 w-full h-full rounded-full object-cover transition-all duration-300"
          />
        </div>

        {/* Expanded Card Content - appears below shrunk image */}
        <div className={`bg-white rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden ${
          isHovered 
            ? 'opacity-100 max-h-[600px] p-6 border border-gray-100 mt-2' 
            : 'opacity-0 max-h-0 p-0 border-0'
        }`}>
          
          {/* Role Badge */}
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-sm font-semibold">
              {member.role}
            </span>
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4 text-center">
            {member.bio}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">
              Expertise
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full font-medium border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-200">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-2 bg-gray-100 hover:bg-blue-100 rounded-full transition-colors group/icon"
                title="Email"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover/icon:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-blue-100 rounded-full transition-colors group/icon"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover/icon:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-gray-800 rounded-full transition-colors group/icon"
                title="GitHub"
              >
                <svg className="w-4 h-4 text-gray-600 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Name below - hidden on hover */}
      <div className={`text-center mt-4 transition-all duration-300 ${
        isHovered ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
      }`}>
        <h3 className={`font-bold text-gray-900 ${isLead ? 'text-2xl' : 'text-xl'}`}>
          {member.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{member.role}</p>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
