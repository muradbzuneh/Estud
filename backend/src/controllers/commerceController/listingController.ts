import user from "../../models/authModel/userModels.js";
import MarketplaceItem from "../../models/commerceModel/MarketplaceItem.js";
import { Request, Response } from "express";



export const createItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const activeCount = await MarketplaceItem.countDocuments({
      createdBy: userId,
      isActive: true
    });

    if (activeCount >= 5) {
      return res.status(400).json({
        message: "You reached maximum 5 active listings"
      });
    }

    const item = await MarketplaceItem.create({
      ...req.body,
      createdBy: userId
    });

    res.status(201).json(item);

  } catch (error) {
    res.status(500).json({ message: "Failed to create item" });
  }
};

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
      .populate("createdBy", "name")
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