import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User'
  },
  address: {
    type: String, 
    required: true,
  },
  nameService: {
    type: String, 
    required: true,
  }, 
  mainFeature: {
    type: String, 
    required: true, 
  },
  extraFeature: { 
    type: String, 
    required: false,
  },
  price: { 
    type: String, 
    required: true,
  },
  image: { 
    type: String, 
    required: true,
  },
  adminMessage: { 
    type: String, 
    required: true,
    default: 'Bạn có thể hủy đơn. Sau khi đã thống nhất với chúng tôi, bạn sẽ không thể hủy đơn'
  },
  canDeleted: { 
    type: Boolean, 
    require: true, 
    default: true,
  },
  isPaid: { 
    type: Boolean, 
    required: true, 
    default: false, 
  }, 
  isDiscussed: { 
    type: Boolean, 
    required: true, 
    default: false, 
  }, 
  isPerformed: { 
    type: Boolean, 
    required: true, 
    default: false, 
  }
}, { 
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;