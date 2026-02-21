import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { createItem, getItems } from "../../controllers/commerceController/listingController.js";

const router = Router();

router.post("/", authenticate, createItem);
router.get("/", authenticate, getItems);

export default router;
