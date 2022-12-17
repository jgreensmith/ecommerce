import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  customerId: {
    type: String
  },
  connectedAccount: {
    type: String
  },
  orders: {
    type: Array
  },
  holidayMode: {
    type: Boolean,
    default: false
  },
  canceled: {
    type: Boolean,
    default: false
  },
  pid: {
    type: String
  },
  preview_mode: {
    type: String
  },
  encrypted_manage_inventory: {
    type: String
  },
  auth_tag: {
    type: String
  },
  iv: {
    type: String
  },
  reviews: {
    type: Array
  }
  
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

