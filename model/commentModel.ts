import { Document, model, Schema, Types } from "mongoose";

interface iComment {
  title: string;
  userID: string;
}

interface iCommentData extends iComment, Document {}

const commentpostModel = new Schema<iCommentData>(
  {
    title: {
      type: String,
    },

    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iCommentData>("comments", commentpostModel);
