import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../models/User";

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  user.id = user._id;
  delete user._id;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

export default mongoose.model<IUserModel>("User", userSchema);
