import React, { useState, useEffect } from 'react'
import axios from 'axios'

const News = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
      setLoading(false);
    }
  };

  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    if (now < start) return 'upcoming';
    if (now > end) return 'past';
    return 'live';
  };

  const categorizeEvents = () => {
    const eventActivities = events.filter(e => e.category === 'Event');
    const newsItems = events.filter(e => e.category === 'News');

    const categorized = {
      eventActivities: {
        live: eventActivities.filter(e => getEventStatus(e.date, e.endDate) === 'live'),
        upcoming: eventActivities.filter(e => getEventStatus(e.date, e.endDate) === 'upcoming'),
        past: eventActivities.filter(e => getEventStatus(e.date, e.endDate) === 'past')
      },
      news: newsItems
    };

    return categorized;
  };

  const categorized = categorizeEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            News & Events
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest happenings, workshops, and events at Srajnik Lab
          </p>
        </div>
      </section>

      {/* News Section */}
      {categorized.news.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Latest News & Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorized.news.map((item) => (
              <EventCard key={item._id} event={item} onImageClick={setSelectedImage} />
            ))}
          </div>
        </section>
      )}

      {/* Live Events Section */}
      {categorized.eventActivities.live.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-red-600 to-pink-600 rounded-full animate-pulse"></span>
            Live Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorized.eventActivities.live.map((event) => (
              <EventCard key={event._id} event={event} status="live" onImageClick={setSelectedImage} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {categorized.eventActivities.upcoming.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></span>
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorized.eventActivities.upcoming.map((event) => (
              <EventCard key={event._id} event={event} status="upcoming" onImageClick={setSelectedImage} />
            ))}
          </div>
        </section>
      )}

      {/* Past Events Section */}
      {categorized.eventActivities.past.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-gray-600 to-gray-400 rounded-full"></span>
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorized.eventActivities.past.map((event) => (
              <EventCard key={event._id} event={event} status="past" onImageClick={setSelectedImage} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No events or news available yet. Check back soon!</p>
          </div>
        </section>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-bold"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Event Card Component
const EventCard = ({ event, status, onImageClick }) => {
  const getStatusBadge = () => {
    if (!status) return null;
    
    const badges = {
      live: 'bg-red-600 text-white animate-pulse',
      upcoming: 'bg-green-600 text-white',
      past: 'bg-gray-600 text-white'
    };

    const labels = {
      live: '🔴 LIVE NOW',
      upcoming: '📅 UPCOMING',
      past: '✓ COMPLETED'
    };

    return (
      <div className={`absolute top-4 left-4 ${badges[status]} px-4 py-2 rounded-lg font-bold text-sm z-10`}>
        {labels[status]}
      </div>
    );
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const formatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    
    if (!end || start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', formatOptions);
    }

    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', formatOptions)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500 group">
      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => onImageClick(event.image)}>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {getStatusBadge()}
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
          {formatDateRange(event.date, event.endDate)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{event.location}</span>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default News
