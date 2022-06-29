import mongoose, { model, Schema } from "mongoose";
import { Roles } from "../enums/roles.enum";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: Roles.MEMBER },
});

export const User = model<IUser>("User", UserSchema);
