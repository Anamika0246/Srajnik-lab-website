import express from 'express';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getAllContacts,
  markContactAsRead,
  deleteContact,
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAllResources,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Project routes
router.get('/projects', getAllProjects);
router.post('/projects', protect, admin, createProject);
router.put('/projects/:id', protect, admin, updateProject);
router.delete('/projects/:id', protect, admin, deleteProject);

// Event routes
router.get('/events', getAllEvents);
router.post('/events', protect, admin, createEvent);
router.put('/events/:id', protect, admin, updateEvent);
router.delete('/events/:id', protect, admin, deleteEvent);

// Gallery routes
router.get('/gallery', getAllGalleryImages);
router.post('/gallery', protect, admin, addGalleryImage);
router.put('/gallery/:id', protect, admin, updateGalleryImage);
router.delete('/gallery/:id', protect, admin, deleteGalleryImage);

// Contact routes
router.get('/contacts', protect, admin, getAllContacts);
router.put('/contacts/:id/read', protect, admin, markContactAsRead);
router.delete('/contacts/:id', protect, admin, deleteContact);

// Team Member routes
router.get('/team', getAllTeamMembers);
router.post('/team', protect, admin, createTeamMember);
router.put('/team/:id', protect, admin, updateTeamMember);
router.delete('/team/:id', protect, admin, deleteTeamMember);

// Resource routes
router.get('/resources', getAllResources);
router.post('/resources', protect, admin, createResource);
router.put('/resources/:id', protect, admin, updateResource);
router.delete('/resources/:id', protect, admin, deleteResource);

export default router;
