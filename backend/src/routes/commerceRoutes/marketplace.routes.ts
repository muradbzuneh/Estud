import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/upload.js";
import { 
  createItem, 
  getItems,
  getItemById,
  markAsSold,
  updateItem,
  deleteItem,
  getMyListings
} from "../../controllers/commerceController/listingController.js";

const router = Router();

// Create listing with images (Students only)
router.post("/", authenticate, authorize(["STUDENT"]), upload.array('images', 5), createItem);

// Get all listings (All authenticated users)
router.get("/", authenticate, getItems);

// Get my listings (Students only)
router.get("/my", authenticate, authorize(["STUDENT"]), getMyListings);

// Get single listing (All authenticated users)
router.get("/:id", authenticate, getItemById);

// Mark as sold (Owner only)
router.patch("/:id/sold", authenticate, authorize(["STUDENT"]), markAsSold);

// Update listing with images (Owner only)
router.put("/:id", authenticate, authorize(["STUDENT"]), upload.array('images', 5), updateItem);

// Delete listing (Owner or Admin)
router.delete("/:id", authenticate, deleteItem);

export default router;
