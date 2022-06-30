import { Application } from "express";
import { MONGO, POST_IMG_FOLDER } from "../environments/environment";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { PostService } from "./services/post.service";
import { PostController } from "./controllers/post.controller";
import { handleErrors } from "./handlers/error.handler";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { checkJwt } from "./handlers/jwt.handler";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
    this.setErrorHandling();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use("/api/uploads/", checkJwt, express.static(POST_IMG_FOLDER));
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO.url, {
      useNewUrlParser: true,
    } as ConnectOptions);
  }

  private setControllers() {
    const authController = new AuthController(new AuthService());
    const postController = new PostController(new PostService());
    const userController = new UserController(new UserService());
    this.app.use("/api/auth", authController.router);
    this.app.use("/api/posts", postController.router);
    this.app.use("/api/users", userController.router);
  }

  private setErrorHandling() {
    this.app.use(handleErrors);
  }
}

export default new App().app;
