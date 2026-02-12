import Project from '../models/Project.js';
import Event from '../models/Event.js';
import GalleryImage from '../models/GalleryImage.js';
import Contact from '../models/Contact.js';
import { sendContactFormEmail, sendContactFormAutoReply } from '../utils/emailService.js';
import TeamMember from '../models/TeamMember.js';
import Resource from '../models/Resource.js';

// PROJECT CONTROLLERS
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (project) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EVENT CONTROLLERS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event) {
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GALLERY CONTROLLERS
export const getAllGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (image) {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CONTACT CONTROLLERS
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    // Save contact to database
    const contact = await Contact.create(req.body);
    
    // Send email notification to admin
    try {
      await sendContactFormEmail(req.body);
      console.log('✓ Contact form email sent to admin');
    } catch (emailError) {
      console.error('✗ Failed to send admin email:', emailError.message);
      // Continue even if email fails - contact is saved
    }
    
    // Send auto-reply to submitter
    try {
      const autoReplyResult = await sendContactFormAutoReply(req.body.email, req.body.name);
      if (autoReplyResult && autoReplyResult.success) {
        console.log('✓ Auto-reply email sent to submitter');
      } else {
        console.log('✗ Failed to send auto-reply:', autoReplyResult?.error || 'Unknown error');
      }
    } catch (emailError) {
      console.error('✗ Failed to send auto-reply:', emailError.message);
    }
    
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: error.message });
  }
};

export const markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact) {
      res.json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TEAM MEMBER CONTROLLERS
export const getAllTeamMembers = async (req, res) => {
  try {
    console.log('Fetching all team members...');
    const teamMembers = await TeamMember.find({}).sort({ order: 1, createdAt: -1 });
    console.log('Found', teamMembers.length, 'team members');
    res.json(teamMembers);
  } catch (error) {
    console.error('GET /team error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (teamMember) {
      res.json(teamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (teamMember) {
      res.json({ message: 'Team member deleted successfully' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESOURCE CONTROLLERS
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (resource) {
      res.json({ message: 'Resource deleted successfully' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
