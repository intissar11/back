
const express = require("express");
const { addItem, getUserCart, deleteItem, deleteCart } = require("../controllers/Cart");
const isAuth = require("../middlewares/auth");
const router = express.Router();

router.post("/cart", isAuth,addItem);//isAuth=>req.user._id<=config(headers)
router.get("/cart",  getUserCart);
router.delete("/:productId",  deleteItem);
router.delete("/cart", deleteCart);

module.exports = router;