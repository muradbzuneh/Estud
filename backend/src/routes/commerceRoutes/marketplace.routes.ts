import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
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

// Create listing (Students only)
router.post("/", authenticate, authorize(["STUDENT"]), createItem);

// Get all listings (All authenticated users)
router.get("/", authenticate, getItems);

// Get my listings (Students only)
router.get("/my", authenticate, authorize(["STUDENT"]), getMyListings);

// Get single listing (All authenticated users)
router.get("/:id", authenticate, getItemById);

// Mark as sold (Owner only)
router.patch("/:id/sold", authenticate, authorize(["STUDENT"]), markAsSold);

// Update listing (Owner only)
router.put("/:id", authenticate, authorize(["STUDENT"]), updateItem);

// Delete listing (Owner or Admin)
router.delete("/:id", authenticate, deleteItem);

export default router;
