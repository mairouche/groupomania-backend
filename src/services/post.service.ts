import * as fs from "fs";
import mongoose, {
  isObjectIdOrHexString,
  model,
  ObjectId,
  Schema,
} from "mongoose";
import path, { resolve } from "path";
import { arrayBuffer } from "stream/consumers";
import { CommentDTO } from "../dto/comment.dto";
import { HttpError } from "../errors/http.errors";
import { IPost, Post } from "../models/post.model";

export class PostService {
  POST_IMG_FOLDER: String = "./public/posts/img";

  public list(): Promise<IPost[]> {
    return Post.find({}).exec();
  }

  public async add(post: IPost, file: any): Promise<IPost> {
    const newPost = new Post(post);
    newPost._id = new mongoose.Types.ObjectId();
    newPost.image = file.path;
    return await newPost.save();
  }

  public async delete(id: string) {
    let imagePath = "";
    Post.find({ _id: id })
      .then((data) => {
        imagePath = data[0].image;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    const deletedPost = await Post.findByIdAndDelete(id).exec();

    if (!deletedPost) {
      throw new HttpError(`Post with id '${id}' not found`, 404);
    } else {
      const jsonPath = path.join(__dirname, "..", "..", imagePath);
      fs.unlinkSync(jsonPath);
    }
  }

  public async update(id: string, post: IPost | Partial<IPost>) {
    const updatedPost = await Post.findByIdAndUpdate(id, post).exec();

    if (!updatedPost) {
      throw new HttpError(`Post with id '${id}' not found`, 404);
    }

    return updatedPost;
  }

  public async addComment(idPost: string, comment: CommentDTO): Promise<any> {
    return Post.find({ _id: idPost })
      .then((data) => {
        if (comment.content != null && comment.content != "") {
          data[0].comments.push(comment);
          return Post.findByIdAndUpdate(idPost, data[0]).exec();
        } else {
          throw new Error("Empty comment");
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  public async like(idPost: string, userId: string): Promise<any> {
    return Post.find({ _id: idPost })
      .then((data) => {
        data[0].likers.push(new mongoose.Types.ObjectId(userId));
        return Post.findByIdAndUpdate(idPost, data[0]).exec();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  public async unlike(idPost: string, userId: string): Promise<any> {
    return Post.find({ _id: idPost })
      .then((data) => {
        let index = data[0].likers.indexOf({
          _id: new mongoose.Types.ObjectId(userId),
        });
        data[0].likers.splice(index, 1);
        return Post.findByIdAndUpdate(idPost, data[0]).exec();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
