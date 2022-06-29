import { NextFunction, Request, Response, Router } from "express";
import { PostService } from "../services/posts.service";
import { checkJwt } from "../handlers/jwt.handler";

export class PostController {
  public router = Router();

  constructor(private postService: PostService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get("/", checkJwt, this.listPosts);
    this.router.post("/", checkJwt, this.add);
    this.router.delete("/:id", checkJwt, this.delete);
    this.router.put("/:id", checkJwt, this.update);
  }

  private listPosts = async (_: Request, res: Response, next: NextFunction) => {
    const posts = await this.postService.list();
    res.send(posts);
  };

  private add = async (req: Request, res: Response, next: NextFunction) => {
    const post = await this.postService.add(req.body);
    res.send(post);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const post = await this.postService.delete(req.params.id);
    res.send(post);
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    await this.postService.update(req.params.id, req.body);
    res.status(204).send();
  };
}
