// models/MarketplaceFavorite.ts
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MarketplaceItem"
  }
});

favoriteSchema.index({ user: 1, item: 1 }, { unique: true });

export default mongoose.model("MarketplaceFavorite", favoriteSchema);