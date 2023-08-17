import User from "../models/userModel.js";
import customError from "../utils/customError.js";
import jwt from "jsonwebtoken";


const protect = async (req, res, next) => { 
  let jwtToken = req.cookies.jwt;

  try { 
    if (jwtToken) { 
      const tokenChecked = jwt.verify(jwtToken, process.env.JWT_SECRET);
      if (tokenChecked) { 
        req.user = await User.findById(tokenChecked.userId).select('-password');
        next();
      } else { 
        next(customError('Invalid token, not authorized'), 401)
      }
    } else { 
      next(customError('No token detected, not authorized', 401));
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};

const admin = async (req, res, next) => { 
  if (req.user && req.user.isAdmin) { 
    next();
  } else { 
    next(customError('Not authorized as admin', 401));
  }
};

export { 
  protect,
  admin,
}