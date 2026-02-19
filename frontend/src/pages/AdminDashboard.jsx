import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // States for different sections
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [resources, setResources] = useState([]);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', category: '', technologies: '', date: '', image: '', githubLink: '', demoLink: ''
  });
  const [eventForm, setEventForm] = useState({
    title: '', description: '', category: 'Event', date: '', endDate: '', location: '', image: ''
  });
  const [galleryForm, setGalleryForm] = useState({
    url: '', title: '', category: '', description: ''
  });
  const [teamForm, setTeamForm] = useState({
    name: '', role: '', image: '', bio: '', skills: '', email: '', linkedin: '', github: '', isLabHead: false
  });
  const [resourceForm, setResourceForm] = useState({
    title: '', description: '', category: '', link: '', tags: '', author: '', difficulty: 'Beginner'
  });
  const [teamImageFile, setTeamImageFile] = useState(null);

  // File upload states
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit mode states
  const [editingProject, setEditingProject] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editingResource, setEditingResource] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [user, isAdmin, navigate]);

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  // Upload image to Cloudinary
  const uploadImage = async (file, folder) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const response = await axios.post(
        `${API_URL}/upload/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`
          }
        }
      );

      return response.data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const fetchData = async () => {
    try {
      const [projectsRes, eventsRes, galleryRes, contactsRes, teamRes, resourcesRes] = await Promise.all([
        axios.get(`${API_URL}/admin/projects`),
        axios.get(`${API_URL}/admin/events`),
        axios.get(`${API_URL}/admin/gallery`),
        axios.get(`${API_URL}/admin/contacts`, getConfig()),
        axios.get(`${API_URL}/admin/team`),
        axios.get(`${API_URL}/admin/resources`)
      ]);
      setProjects(projectsRes.data);
      setEvents(eventsRes.data);
      setGalleryImages(galleryRes.data);
      setContacts(contactsRes.data);
      setTeamMembers(teamRes.data);
      setResources(resourcesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Project handlers
  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = projectForm.image;

      // Upload image if file is selected
      if (projectImageFile) {
        imageUrl = await uploadImage(projectImageFile, 'srajnik-lab/projects');
      }

      if (!imageUrl) {
        setMessage('Please provide an image');
        setLoading(false);
        return;
      }

      const technologies = projectForm.technologies.split(',').map(t => t.trim());
      await axios.post(`${API_URL}/admin/projects`, {...projectForm, image: imageUrl, technologies}, getConfig());
      setMessage('Project added successfully!');
      setProjectForm({ title: '', description: '', category: '', technologies: '', date: '', image: '', githubLink: '', demoLink: '' });
      setProjectImageFile(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error adding project');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/admin/projects/${id}`, getConfig());
        setMessage('Project deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Error deleting project');
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies.join(', '),
      date: project.date,
      image: project.image,
      githubLink: project.githubLink,
      demoLink: project.demoLink || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = projectForm.image;

      if (projectImageFile) {
        imageUrl = await uploadImage(projectImageFile, 'srajnik-lab/projects');
      }

      const technologies = projectForm.technologies.split(',').map(t => t.trim());
      await axios.put(`${API_URL}/admin/projects/${editingProject}`, {...projectForm, image: imageUrl, technologies}, getConfig());
      setMessage('Project updated successfully!');
      setProjectForm({ title: '', description: '', category: '', technologies: '', date: '', image: '', githubLink: '', demoLink: '' });
      setProjectImageFile(null);
      setEditingProject(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error updating project');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelEditProject = () => {
    setEditingProject(null);
    setProjectForm({ title: '', description: '', category: '', technologies: '', date: '', image: '', githubLink: '', demoLink: '' });
    setProjectImageFile(null);
  };

  // Event handlers
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = eventForm.image;

      // Upload image if file is selected
      if (eventImageFile) {
        imageUrl = await uploadImage(eventImageFile, 'srajnik-lab/events');
      }

      await axios.post(`${API_URL}/admin/events`, {...eventForm, image: imageUrl}, getConfig());
      setMessage('Event added successfully!');
      setEventForm({ title: '', description: '', category: 'Event', date: '', endDate: '', location: '', image: '' });
      setEventImageFile(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error adding event');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_URL}/admin/events/${id}`, getConfig());
        setMessage('Event deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Error deleting event');
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event._id);
    setEventForm({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date.split('T')[0],
      endDate: event.endDate ? event.endDate.split('T')[0] : '',
      location: event.location,
      image: event.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = eventForm.image;

      if (eventImageFile) {
        imageUrl = await uploadImage(eventImageFile, 'srajnik-lab/events');
      }

      await axios.put(`${API_URL}/admin/events/${editingEvent}`, {...eventForm, image: imageUrl}, getConfig());
      setMessage('Event updated successfully!');
      setEventForm({ title: '', description: '', category: 'Event', date: '', endDate: '', location: '', image: '' });
      setEventImageFile(null);
      setEditingEvent(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error updating event');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelEditEvent = () => {
    setEditingEvent(null);
    setEventForm({ title: '', description: '', category: 'Event', date: '', endDate: '', location: '', image: '' });
    setEventImageFile(null);
  };

  // Gallery handlers
  const handleAddGalleryImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = galleryForm.url;

      // Upload image if file is selected
      if (galleryImageFile) {
        imageUrl = await uploadImage(galleryImageFile, 'srajnik-lab/gallery');
      }

      if (!imageUrl) {
        setMessage('Please provide an image');
        setLoading(false);
        return;
      }

      await axios.post(`${API_URL}/admin/gallery`, {...galleryForm, url: imageUrl}, getConfig());
      setMessage('Image added to gallery!');
      setGalleryForm({ url: '', title: '', category: '', description: '' });
      setGalleryImageFile(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error adding image');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`${API_URL}/admin/gallery/${id}`, getConfig());
        setMessage('Image deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Error deleting image');
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditGallery = (image) => {
    setEditingGallery(image._id);
    setGalleryForm({
      url: image.url,
      title: image.title,
      category: image.category,
      description: image.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateGallery = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = galleryForm.url;

      if (galleryImageFile) {
        imageUrl = await uploadImage(galleryImageFile, 'srajnik-lab/gallery');
      }

      await axios.put(`${API_URL}/admin/gallery/${editingGallery}`, {...galleryForm, url: imageUrl}, getConfig());
      setMessage('Gallery image updated successfully!');
      setGalleryForm({ url: '', title: '', category: '', description: '' });
      setGalleryImageFile(null);
      setEditingGallery(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error updating image');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelEditGallery = () => {
    setEditingGallery(null);
    setGalleryForm({ url: '', title: '', category: '', description: '' });
    setGalleryImageFile(null);
  };

  const handleMarkContactAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/admin/contacts/${id}/read`, {}, getConfig());
      fetchData();
    } catch (error) {
      console.error('Error marking contact as read');
    }
  };

  // Team handlers
  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = teamForm.image;

      if (teamImageFile) {
        imageUrl = await uploadImage(teamImageFile, 'srajnik-lab/team');
      }

      if (!imageUrl) {
        setMessage('Please provide an image');
        setLoading(false);
        return;
      }

      const skills = teamForm.skills.split(',').map(s => s.trim());
      await axios.post(`${API_URL}/admin/team`, {...teamForm, image: imageUrl, skills}, getConfig());
      setMessage('Team member added successfully!');
      setTeamForm({ name: '', role: '', image: '', bio: '', skills: '', email: '', linkedin: '', github: '', isLabHead: false });
      setTeamImageFile(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error adding team member');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete(`${API_URL}/admin/team/${id}`, getConfig());
        setMessage('Team member deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Error deleting team member');
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditTeam = (member) => {
    setEditingTeam(member._id);
    setTeamForm({
      name: member.name,
      role: member.role,
      image: member.image,
      bio: member.bio,
      skills: member.skills.join(', '),
      email: member.email,
      linkedin: member.linkedin || '',
      github: member.github || '',
      isLabHead: member.isLabHead
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = teamForm.image;

      if (teamImageFile) {
        imageUrl = await uploadImage(teamImageFile, 'srajnik-lab/team');
      }

      const skills = teamForm.skills.split(',').map(s => s.trim());
      await axios.put(`${API_URL}/admin/team/${editingTeam}`, {...teamForm, image: imageUrl, skills}, getConfig());
      setMessage('Team member updated successfully!');
      setTeamForm({ name: '', role: '', image: '', bio: '', skills: '', email: '', linkedin: '', github: '', isLabHead: false });
      setTeamImageFile(null);
      setEditingTeam(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error updating team member');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelEditTeam = () => {
    setEditingTeam(null);
    setTeamForm({ name: '', role: '', image: '', bio: '', skills: '', email: '', linkedin: '', github: '', isLabHead: false });
    setTeamImageFile(null);
  };

  // Resource handlers
  const handleAddResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tags = resourceForm.tags.split(',').map(t => t.trim());
      await axios.post(`${API_URL}/admin/resources`, {...resourceForm, tags}, getConfig());
      setMessage('Resource added successfully!');
      setResourceForm({ title: '', description: '', category: '', link: '', tags: '', author: '', difficulty: 'Beginner' });
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error adding resource');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await axios.delete(`${API_URL}/admin/resources/${id}`, getConfig());
        setMessage('Resource deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Error deleting resource');
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource._id);
    setResourceForm({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      link: resource.link,
      tags: resource.tags.join(', '),
      author: resource.author || '',
      difficulty: resource.difficulty
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tags = resourceForm.tags.split(',').map(t => t.trim());
      await axios.put(`${API_URL}/admin/resources/${editingResource}`, {...resourceForm, tags}, getConfig());
      setMessage('Resource updated successfully!');
      setResourceForm({ title: '', description: '', category: '', link: '', tags: '', author: '', difficulty: 'Beginner' });
      setEditingResource(null);
      fetchData();
    } catch (error) {
      setMessage(error.message || 'Error updating resource');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancelEditResource = () => {
    setEditingResource(null);
    setResourceForm({ title: '', description: '', category: '', link: '', tags: '', author: '', difficulty: 'Beginner' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100 text-sm sm:text-base">Manage your lab's content</p>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 sm:px-6 py-4 rounded-xl">
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-3 sm:gap-4 mb-8 pb-2 scrollbar-hide">
          {['projects', 'events', 'gallery', 'team', 'resources', 'contacts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 rounded-xl font-semibold capitalize transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Category" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Technologies (comma-separated)" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Date (e.g., Jan 2025)" value={projectForm.date} onChange={(e) => setProjectForm({...projectForm, date: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project Image {!editingProject && '(Required)'}</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setProjectImageFile(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {projectImageFile && (
                    <p className="mt-2 text-sm text-green-600">✓ {projectImageFile.name}</p>
                  )}
                  {editingProject && !projectImageFile && (
                    <p className="mt-2 text-sm text-gray-600">Current image will be kept if no new file is uploaded</p>
                  )}
                </div>
                <input type="url" placeholder="GitHub Link" value={projectForm.githubLink} onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="url" placeholder="Demo Link (Optional - Google Drive/Other)" value={projectForm.demoLink} onChange={(e) => setProjectForm({...projectForm, demoLink: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <textarea placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required rows="3" className="md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none" />
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading || uploadingImage} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                    {uploadingImage ? 'Uploading Image...' : loading ? (editingProject ? 'Updating...' : 'Adding...') : (editingProject ? 'Update Project' : 'Add Project')}
                  </button>
                  {editingProject && (
                    <button type="button" onClick={handleCancelEditProject} className="px-6 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Existing Projects ({projects.length})</h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div>
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-600">{project.category} • {project.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditProject(project)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteProject(project._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{editingEvent ? 'Edit Event/News' : 'Add New Event/News'}</h2>
              <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent} className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <select value={eventForm.category} onChange={(e) => setEventForm({...eventForm, category: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
                  <option value="Event">Event Activity (Workshop/Webinar)</option>
                  <option value="News">News (Notice/Announcement)</option>
                </select>
                <input type="date" placeholder="Start Date" value={eventForm.date} onChange={(e) => setEventForm({...eventForm, date: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="date" placeholder="End Date (Optional)" value={eventForm.endDate} onChange={(e) => setEventForm({...eventForm, endDate: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({...eventForm, location: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Image (Optional)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setEventImageFile(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {eventImageFile && (
                    <p className="mt-2 text-sm text-green-600">✓ {eventImageFile.name}</p>
                  )}
                </div>
                <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} required rows="3" className="md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none" />
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading || uploadingImage} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                    {uploadingImage ? 'Uploading Image...' : loading ? (editingEvent ? 'Updating...' : 'Adding...') : (editingEvent ? 'Update Event' : 'Add Event')}
                  </button>
                  {editingEvent && (
                    <button type="button" onClick={handleCancelEditEvent} className="px-6 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Existing Events ({events.length})</h2>
              <div className="grid gap-4">
                {events.map((event) => (
                  <div key={event._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditEvent(event)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteEvent(event._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{editingGallery ? 'Edit Gallery Image' : 'Add Gallery Image'}</h2>
              <form onSubmit={editingGallery ? handleUpdateGallery : handleAddGalleryImage} className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setGalleryImageFile(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {galleryImageFile && (
                    <div className="mt-4">
                      <img 
                        src={URL.createObjectURL(galleryImageFile)} 
                        alt="Preview" 
                        className="w-full max-w-xs h-48 object-cover rounded-xl"
                      />
                      <p className="mt-2 text-sm text-green-600">✓ {galleryImageFile.name}</p>
                    </div>
                  )}
                  {editingGallery && !galleryImageFile && (
                    <p className="mt-2 text-sm text-gray-600">Current image will be kept if no new file is uploaded</p>
                  )}
                </div>
                <input type="text" placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <select value={galleryForm.category} onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
                  <option value="">Select Category</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Events">Events</option>
                  <option value="Projects">Projects</option>
                  <option value="Lab">Lab</option>
                </select>
                <input type="text" placeholder="Description" value={galleryForm.description} onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})} required className="md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading || uploadingImage || (!galleryImageFile && !editingGallery)} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                    {uploadingImage ? 'Uploading Image...' : loading ? (editingGallery ? 'Updating...' : 'Adding...') : (editingGallery ? 'Update Image' : 'Add to Gallery')}
                  </button>
                  {editingGallery && (
                    <button type="button" onClick={handleCancelEditGallery} className="px-6 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Gallery Images ({galleryImages.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <div key={image._id} className="relative group">
                    <img src={image.url} alt={image.title} className="w-full h-40 object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center gap-2">
                      <button onClick={() => handleEditGallery(image)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteGalleryImage(image._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                        Delete
                      </button>
                    </div>
                    <p className="text-sm font-semibold mt-2 text-center">{image.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Form Submissions ({contacts.length})</h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact._id} className={`p-6 rounded-xl border-2 ${contact.status === 'unread' ? 'border-blue-200 bg-blue-50' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {contact.status === 'unread' && (
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-semibold">New</span>
                      )}
                      <button onClick={() => handleMarkContactAsRead(contact._id)} className="text-sm text-blue-600 hover:text-blue-700">
                        Mark as Read
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Subject: {contact.subject}</p>
                  <p className="text-gray-700">{contact.message}</p>
                  <p className="text-xs text-gray-500 mt-4">{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{editingTeam ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <form onSubmit={editingTeam ? handleUpdateTeam : handleAddTeamMember} className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name" value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Role" value={teamForm.role} onChange={(e) => setTeamForm({...teamForm, role: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="email" placeholder="Email" value={teamForm.email} onChange={(e) => setTeamForm({...teamForm, email: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Skills (comma-separated)" value={teamForm.skills} onChange={(e) => setTeamForm({...teamForm, skills: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="url" placeholder="LinkedIn URL (optional)" value={teamForm.linkedin} onChange={(e) => setTeamForm({...teamForm, linkedin: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="url" placeholder="GitHub URL (optional)" value={teamForm.github} onChange={(e) => setTeamForm({...teamForm, github: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setTeamImageFile(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {teamImageFile && (
                    <p className="mt-2 text-sm text-green-600">✓ {teamImageFile.name}</p>
                  )}
                  {editingTeam && !teamImageFile && (
                    <p className="mt-2 text-sm text-gray-600">Current image will be kept if no new file is uploaded</p>
                  )}
                </div>
                <textarea placeholder="Bio" value={teamForm.bio} onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})} required rows="4" className="md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isLabHead" checked={teamForm.isLabHead} onChange={(e) => setTeamForm({...teamForm, isLabHead: e.target.checked})} className="w-5 h-5 text-blue-600 rounded" />
                  <label htmlFor="isLabHead" className="text-sm font-semibold text-gray-700">Mark as Lab Head</label>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading || uploadingImage} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                    {uploadingImage ? 'Uploading Image...' : loading ? (editingTeam ? 'Updating...' : 'Adding...') : (editingTeam ? 'Update Team Member' : 'Add Team Member')}
                  </button>
                  {editingTeam && (
                    <button type="button" onClick={handleCancelEditTeam} className="px-6 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Team Members ({teamMembers.length})</h2>
              <div className="grid gap-4">
                {teamMembers.map((member) => (
                  <div key={member._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-lg">{member.name} {member.isLabHead && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Lab Head</span>}</h3>
                        <p className="text-sm text-gray-600">{member.role} • {member.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditTeam(member)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTeamMember(member._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{editingResource ? 'Edit Resource' : 'Add Resource'}</h2>
              <form onSubmit={editingResource ? handleUpdateResource : handleAddResource} className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Title" value={resourceForm.title} onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <select value={resourceForm.category} onChange={(e) => setResourceForm({...resourceForm, category: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
                  <option value="">Select Category</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="Course">Course</option>
                  <option value="Article">Article</option>
                  <option value="Other">Other</option>
                </select>
                <input type="url" placeholder="Resource Link" value={resourceForm.link} onChange={(e) => setResourceForm({...resourceForm, link: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <select value={resourceForm.difficulty} onChange={(e) => setResourceForm({...resourceForm, difficulty: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <input type="text" placeholder="Author (optional)" value={resourceForm.author} onChange={(e) => setResourceForm({...resourceForm, author: e.target.value})} className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Tags (comma-separated)" value={resourceForm.tags} onChange={(e) => setResourceForm({...resourceForm, tags: e.target.value})} required className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" />
                <textarea placeholder="Description" value={resourceForm.description} onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})} required rows="3" className="md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none" />
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                    {loading ? (editingResource ? 'Updating...' : 'Adding...') : (editingResource ? 'Update Resource' : 'Add Resource')}
                  </button>
                  {editingResource && (
                    <button type="button" onClick={handleCancelEditResource} className="px-6 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Resources ({resources.length})</h2>
              <div className="grid gap-4">
                {resources.map((resource) => (
                  <div key={resource._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.category} • {resource.difficulty} {resource.author && `• ${resource.author}`}</p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">{resource.link}</a>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditResource(resource)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteResource(resource._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
