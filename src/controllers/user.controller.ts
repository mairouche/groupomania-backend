import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { checkJwt } from "../handlers/jwt.handler";

export class UserController {
  public router = Router();

  constructor(private userService: UserService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get("/", checkJwt, this.listUsers);
  }

  private listUsers = async (_: Request, res: Response, next: NextFunction) => {
    const users = await this.userService.list();
    res.send(users);
  };
}
