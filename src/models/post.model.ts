import mongoose, { model, Schema } from "mongoose";

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  authorName: string;
  image: String;
  comments: [content: string, authorName: string];
}

const PostSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  image: { type: String },
  creationDate: { type: Date, default: new Date() },
  comments: [
    {
      content: { type: String, required: true },
      authorName: { type: String, required: true },
      creationDate: { type: Date, default: new Date() },
    },
  ],
  likers: [
    {
      _id: { type: mongoose.Types.ObjectId },
    },
  ],
});

export const Post = model<IPost>("Post", PostSchema);
