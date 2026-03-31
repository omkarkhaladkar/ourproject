import { Router } from 'express';
import {
  deleteAdminProperty,
  getAdminProperties,
  getAdminPropertyById,
  getDashboard,
  getEnquiries,
  getUsers,
  togglePropertyFeatured,
  updateEnquiryStatus,
  updatePropertyStatus,
} from '../controllers/admin.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/properties', getAdminProperties);
router.get('/properties/:id', getAdminPropertyById);
router.patch('/properties/:id/status', updatePropertyStatus);
router.patch('/properties/:id/featured', togglePropertyFeatured);
router.delete('/properties/:id', deleteAdminProperty);
router.get('/users', getUsers);
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);

export default router;
