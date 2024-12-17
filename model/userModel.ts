import { Document, model, Schema, Types } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  friends: Array<string>;
  following: Array<string>;
  follower: Array<string>;
  posts: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    friends: [
      {
        type: String,
      },
    ],
    following: [
      {
        type: String,
      },
    ],
    follower: [
      {
        type: String,
      },
    ],

    posts: [
      {
        type: Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
