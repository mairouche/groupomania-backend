import { Application } from "express";
import { MONGO } from "../environments/environment";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { PostService } from "./services/posts.service";
import { PostController } from "./controllers/posts.controller";
import { handleErrors } from "./handlers/error.handler";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";

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
    this.app.use("/api/auth", authController.router);
    this.app.use("/api/posts", postController.router);
  }

  private setErrorHandling() {
    this.app.use(handleErrors);
  }
}

export default new App().app;
