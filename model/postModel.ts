import { Document, model, Schema, Types } from "mongoose";

interface iPost {
  title: string;
  userID: string;
  postImage: string;
  postImageID: string;
  comments: Array<{}>;
}

interface iPostData extends iPost, Document {}

const postModel = new Schema<iPostData>(
  {
    title: {
      type: String,
    },
    userID: {
      type: String,
    },

    postImage: {
      type: String,
    },
    postImageID: {
      type: String,
    },

    comments: [
      {
        type: Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

export default model<iPostData>("posts", postModel);
