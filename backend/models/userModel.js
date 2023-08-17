
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
    unique: true,
  }, 
  password: { 
    type: String, 
  }, 
  oauthProvider: { type: String }, 
  accessToken: { type: String },
  isAdmin: { 
    type: Boolean, 
    require: true,
    default: false,
  }
})

userSchema.methods.matchPassword = function(enteredPassword) { 
  return bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) { 
  if (!this.isModified('password')) { 
    next();
  } // nó kiểm tra path password có bị thay đổi hay không trong lệnh update, không dành cho lệnh register
  try { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) { 
    console.log('Bcrypt hash fail:' + err);
  }
})

const User = mongoose.model('User', userSchema);

export default User;