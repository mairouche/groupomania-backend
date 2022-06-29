import { NextFunction, Request, Response, Router } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public router = Router();

  constructor(private authService: AuthService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.post("/login", this.login);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = await this.authService.login(req.body);
    res.send(currentUser);
  };
}
