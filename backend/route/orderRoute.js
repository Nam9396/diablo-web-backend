import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getUserOrder, userDeleteOrder } from "../controller/orderController.js";

const orderRoute = express.Router();

// user functions

orderRoute.route('/').post(protect, createOrder);

orderRoute.route('/:id').delete(protect, userDeleteOrder)

orderRoute.route('/mine').get(protect, getUserOrder)

// admin functions

orderRoute.route('/').get();

orderRoute.route('/:id')
  .put()
  .get()
  .delete()

export default orderRoute;