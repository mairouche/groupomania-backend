import mongoose, { model, Schema } from "mongoose";
import { resolve } from "path";
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
    const deletedPost = await Post.findByIdAndDelete(id).exec();

    if (!deletedPost) {
      throw new HttpError(`Post with id '${id}' not found`, 404);
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
}
