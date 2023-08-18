import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  let token = '';
  if (user.oauthProvider) { 
    token = jwt.sign(
      { useremail: user.email, accessToken: user.accessToken, userId: user._id}, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    ); 
  } else { 
    token = jwt.sign(
      { useremail: user.email, userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    ); 
  } 
  res.cookie('jwt', token, { 
    httpOnly: true, 
    sameSite: 'none', //sau khi deploy sameSite Strict khien cookie khong duoc luu, nhung chuyen sang none thi no duoc luu, van de cua none la can secure
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 30 * 24 * 60 * 60 * 1000 ,
  })
};

export default generateToken;