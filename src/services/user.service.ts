import { IUser, User } from "../models/user.model";

export class UserService {
  public list(): Promise<IUser[]> {
    return User.find({}).exec();
  }
}
