import express from 'express';
import { createAdmin, getAllUsers } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create-admin',
    protect,
    authorizeRoles("superadmin"),
    createAdmin,
);

router.get("/users",
    protect,
    authorizeRoles("admin", "superadmin"),
    getAllUsers
);
export default router;