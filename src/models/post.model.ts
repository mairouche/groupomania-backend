import mongoose, { model, Schema } from "mongoose";

export interface IPost extends Document {
  _id: Schema.Types.ObjectId;
  content: string;
  authorName: string;
  image: Object;
  comments: [content: string, authorName: string];
}

const PostSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  image: { type: Object },
  comments: [
    {
      content: { type: String, required: true },
      authorName: { type: String, required: true },
    },
  ],
});

export const Post = model<IPost>("Post", PostSchema);
