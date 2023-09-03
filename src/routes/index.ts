import express from 'express';

import authRoutes from './users';
import postsRoutes from './posts';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);

export default router;
