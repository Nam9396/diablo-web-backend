import User from "../models/userModel.js";
import customError from '../utils/customError.js';
import generateToken from "../utils/generateToken.js";


const oauthUser = async(req, res, next) => { 
  const { email, oauthProvider, accessToken } = req.body; 
  const data = { email, oauthProvider, accessToken };
  const query = { email: email };
  const options = { upsert: true, new: true };
  try { 
    const user = await User.findOneAndUpdate(query, data, options);
    if (user) { 
      generateToken(res, user)
      return res.status(201).json({
        email: user.email, 
        oauthProvider: user.oauthProvider, 
        accessToken: user.accessToken,
      })
    } else { 
      next(customError('Cannot create/oauth user', 400))
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
};


const registerUser = async (req, res, next) => { 
  const { email, password } = req.body;
  try { 
    const userCheck = await User.findOne({ email: email });
    if (!userCheck) { 
      const user = await User.create({
        email,
        password, 
      });
      if (user) {
        generateToken(res, user); // sau khi người dùng đăng ký, cần cung cấp cho họ token để thao tác ngay
        return res.status(201).json({ 
          email: user.email, 
        })
      }
    } else { 
      next(customError('This email is already registed', 400));
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  };
};


const logoutUser = async (req, res, next) => { 
  res.cookie('jwt', '', { 
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Log out successfully' })
};


const authUser = async(req, res, next) => { 
  const { email, password } = req.body;
  try { 
    const userChecked = await User.findOne({ email: email });
    if (!userChecked ) { 
      next(customError('Invalid User', 401));
    } else if (userChecked.oauthProvider) {
      next(customError('This user is oauth validated', 401))
    } else { 
      const isPasswordMatched = await userChecked.matchPassword(password);
      if (!isPasswordMatched) { 
        next(customError('Invalid password', 401))
      } else { 
        generateToken(res, userChecked);
        res.status(201).json(userChecked);
      }
    }
  } catch (err) { 
    console.error('Error:', err);
    next(err);
  }
}

export { 
  oauthUser,
  authUser,
  registerUser,
  logoutUser,   
}