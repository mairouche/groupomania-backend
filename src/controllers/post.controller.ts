import { NextFunction, Request, Response, Router } from "express";
import { PostService } from "../services/post.service";
import { checkJwt } from "../handlers/jwt.handler";
import multer from "multer";
import { fileFilter, storage } from "../config/multer.config";

export class PostController {
  public router = Router();

  constructor(private postService: PostService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get("/", checkJwt, this.listPosts);
    this.router.post("/", checkJwt, this.upload.single("image"), this.add);
    this.router.delete("/:id", checkJwt, this.delete);
    this.router.put("/:id", checkJwt, this.update);
    this.router.post("/:id/comments", checkJwt, this.addComment);
  }

  upload = multer({ storage: storage, fileFilter: fileFilter });

  private listPosts = async (_: Request, res: Response, next: NextFunction) => {
    const posts = await this.postService.list();
    res.send(posts);
  };

  private add = async (req: Request, res: Response, next: NextFunction) => {
    const post = await this.postService.add(req.body, req.file).catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
    res.status(200).send(post);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const post = await this.postService.delete(req.params.id);
    res.send(post);
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    await this.postService.update(req.params.id, req.body);
    res.status(204).send();
  };

  private addComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const post = await this.postService
      .addComment(req.params.id, req.body)
      .catch((err) => {
        console.log(err.message);
        res.status(500).send(err.message);
      });
    res.status(200).send(post);
  };
}
