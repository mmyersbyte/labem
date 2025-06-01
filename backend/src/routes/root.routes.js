import express from 'express';
import { rootHandler } from '../controllers/root.Controller.js';

const router = express.Router();

router.get('/', rootHandler);

export default router;
