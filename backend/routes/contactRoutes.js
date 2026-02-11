import express from 'express';
import { createContact } from '../controllers/adminController.js';

const router = express.Router();

router.post('/', createContact);

export default router;
