import { NextFunction, Request, Response, Router } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public router = Router();

  constructor(private authService: AuthService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.post("/login", this.login);
    this.router.post("/signup", this.signup);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = await this.authService.login(req.body);
    res.send(currentUser);
  };

  private signup = async (req: Request, res: Response, next: NextFunction) => {
    const userCreated = await this.authService.signup(req.body);
    res.send(userCreated);
  };
}
