import { ObjectId } from "mongoose";
import { IUser } from "../models/user.model";

export class CurrentUserVO {
  _id: ObjectId;
  name: string;
  email: string;
  token: string;

  constructor(user: IUser, token: string) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.token = token;
  }
}
