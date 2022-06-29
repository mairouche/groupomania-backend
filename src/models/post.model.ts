import { model, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  authorName: string;
  comments: [content: string, authorName: string];
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  comments: [
    {
      content: { type: String, required: true },
      authorName: { type: String, required: true },
    },
  ],
});

export const Post = model<IPost>("Post", PostSchema);
