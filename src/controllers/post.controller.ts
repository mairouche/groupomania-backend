import { NextFunction, Request, Response, Router } from "express";
import { PostService } from "../services/post.service";
import { checkJwt } from "../handlers/jwt.handler";
import multer from "multer";

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
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/posts/img");
    },

    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname);
    },
  });

  fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
  };

  upload = multer({ storage: this.storage, fileFilter: this.fileFilter });

  private listPosts = async (_: Request, res: Response, next: NextFunction) => {
    const posts = await this.postService.list();
    res.send(posts);
  };

  private add = async (req: Request, res: Response, next: NextFunction) => {
    const post = await this.postService.add(req.body, req.file);
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
