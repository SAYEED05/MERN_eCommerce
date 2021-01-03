import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  cashReceived,
  updateOrderToPacked,
  updateOrderToDispatched,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

router.route("/:id/cashreceived").put(protect, admin, cashReceived);
router.route("/:id/packed").put(protect, admin, updateOrderToPacked);
router.route("/:id/dispatched").put(protect, admin, updateOrderToDispatched);

export default router;
