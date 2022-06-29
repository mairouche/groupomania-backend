import { HttpError } from "../errors/http.errors";
import { IPost, Post } from "../models/post.model";

export class PostService {
  public list(): Promise<IPost[]> {
    return Post.find({}).exec();
  }

  public add(post: IPost): Promise<IPost> {
    const newPost = new Post(post);
    return newPost.save();
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
}
