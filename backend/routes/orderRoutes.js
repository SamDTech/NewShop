import express from "express";
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", addOrderItems);

router.get('/:id', getOrderById)

router.put('/:id/pay', updateOrderToPaid)

export default router;
