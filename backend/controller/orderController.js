import Order from "../models/orderModel.js";
import customError from "../utils/customError.js";

// user functions

const createOrder = async(req, res, next) => {
  const { nameService, mainFeature, extraFeature, address, image, price } = req.body;
  try { 
    const order = await Order.create({
      user: req.user._id, 
      address,
      nameService, 
      mainFeature, 
      extraFeature, 
      image, 
      price,
    });
    if (order) { 
      res.status(201).json(order);
    } else { 
      next(customError('Order cannot created'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};

const getUserOrder = async(req, res, next) => { 
  try { 
    const orders = await Order.find({ user: req.user._id });
    if (orders) { 
      res.status(200).json(orders)
    } else { 
      next(customError('Cannot get your Orders'), 404);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};

const userDeleteOrder = async(req, res, next) => { 
  const { id } = req.params;
  try { 
    const orderDeleted = await Order.findOneAndDelete({ _id: id });
    if (orderDeleted) { 
      return res.status(201).json('Order deleted');
    } else { 
      next(customError('Cannot delete your order'), 401);
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
}


export { 
  createOrder,
  getUserOrder,
  userDeleteOrder
}