import User from "../../models/authModel/userModels.js";
import MarketplaceItem from "../../models/commerceModel/MarketplaceItem.js";
import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";

// FR-15: Students create item listings
export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description, price, category, images } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({ 
        message: "title, description, and price are required" 
      });
    }

    // Get user's department
    const user = await User.findById(userId);
    if (!user || !user.departmentId) {
      return res.status(400).json({ message: "User department not found" });
    }

    // Check active listing limit (max 5)
    const activeCount = await MarketplaceItem.countDocuments({
      createdBy: userId,
      isActive: true,
      isSold: false
    });

    if (activeCount >= 5) {
      return res.status(400).json({
        message: "You have reached the maximum of 5 active listings"
      });
    }

    const item = await MarketplaceItem.create({
      title,
      description,
      price,
      category: category || "other",
      department: user.departmentId,
      images: images || [],
      createdBy: userId
    });

    res.status(201).json({
      message: "Item listed successfully",
      item
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to create item", 
      error: error.message 
    });
  }
};

// FR-16: View listings filtered by department
export const getItems = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const category = req.query.category;
    const department = req.query.department;

    let filter: any = {
      isActive: true,
      isSold: false,
      title: { $regex: search, $options: "i" }
    };

    if (category) filter.category = category;
    if (department) filter.department = department;

    const items = await MarketplaceItem.find(filter)
      .populate("createdBy", "name email")
      .populate("department", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MarketplaceItem.countDocuments(filter);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      items
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// Get single item
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await MarketplaceItem.findById(id)
      .populate("createdBy", "name email studentId")
      .populate("department", "name");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

// FR-17: Mark item as sold
export const markAsSold = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const item = await MarketplaceItem.findOne({
      _id: id,
      createdBy: userId
    });

    if (!item) {
      return res.status(404).json({ 
        message: "Item not found or you don't have permission" 
      });
    }

    item.isSold = true;
    await item.save();

    res.json({
      message: "Item marked as sold",
      item
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

// Update item
export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    const item = await MarketplaceItem.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ 
        message: "Item not found or you don't have permission" 
      });
    }

    res.json({
      message: "Item updated successfully",
      item
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to update item", 
      error: error.message 
    });
  }
};

// FR-18: Admin removes inappropriate listings
export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    
    // Allow deletion by owner or admin
    const query: any = { _id: id };
    if (user?.role !== "ADMIN") {
      query.createdBy = userId;
    }

    const item = await MarketplaceItem.findOneAndUpdate(
      query,
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ 
        message: "Item not found or you don't have permission" 
      });
    }

    res.json({ message: "Item deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};

// Get user's own listings
export const getMyListings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const items = await MarketplaceItem.find({
      createdBy: userId,
      isActive: true
    })
      .populate("department", "name")
      .sort({ createdAt: -1 });

    res.json(items);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};