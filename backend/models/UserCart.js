const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        _id: false,
        productId: String,
        restaurantId: String,
        name: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },

      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    updatedon: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Cart = model("Cartuser", CartSchema);
