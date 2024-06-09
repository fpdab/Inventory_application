const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ItemSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 100 },
    category: { type: String, required: true, maxLength: 100 },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true, min: 0, max: 999 },
    url: { type: String, required: true },
  },
  { collection: "items" }
)

// Export model
module.exports = mongoose.model("Item", ItemSchema)
