import React, { useState, useEffect } from 'react'
import TeamMemberCard from '../components/TeamMemberCard'
import axios from 'axios'

const Team = () => {
  const [labHead, setLabHead] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/team`);
      const members = response.data;
      
      // Separate lab heads from team members (support multiple leaders)
      const heads = members.filter(member => member.isLabHead);
      const team = members.filter(member => !member.isLabHead);
      
      setLabHead(heads); // Now stores array of all lab heads
      setTeamMembers(team);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
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
      {labHead && labHead.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              {labHead.length === 1 ? 'Our Leader' : 'Our Leadership'}
            </h2>
            <p className="text-gray-600 text-lg">
              {labHead.length === 1 
                ? 'Guiding the vision of Srajnik Lab' 
                : 'Leading the vision and direction of Srajnik Lab'}
            </p>
          </div>
          
          {/* Display multiple leaders in organized grid */}
          <div className={`grid gap-12 mb-32 ${
            labHead.length === 1 
              ? 'grid-cols-1 place-items-center' 
              : labHead.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {labHead.map((leader, index) => (
              <div 
                key={leader._id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <TeamMemberCard member={leader} isLead={true} />
              </div>
            ))}
          </div>

          {/* Decorative Divider - only show if there are team members */}
          {teamMembers.length > 0 && (
            <div className="flex items-center justify-center mb-20">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
              <div className="mx-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <span className="text-white text-sm font-semibold">Our Core Team</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
            </div>
          )}
        </section>
      )}

      {/* Team Members Grid */}
      {teamMembers.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {teamMembers.map((member, index) => (
              <div 
                key={member._id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </section>
      )}

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

