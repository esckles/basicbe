import { Request, Response } from "express";
import postModel from "../model/postModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";
import cloudinary from "../utils/cloudinary";

export const createPost = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { title, postImage, postImageID } = req.body;
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    const { secure_url, public_id }: any = await cloudinary.uploader.upload(
      req.file.path
    );

    const post: any = await postModel.create({
      title,
      postImage: secure_url,
      postImageID: public_id,
      userID,
    });

    user?.posts.push(new Types.ObjectId(post?._id));
    user?.save();

    return res.status(201).json({
      message: "Post created successfully",
      status: 201,
      // data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating post",
      status: 404,
    });
  }
};

export const ReadAllPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await postModel.find().sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json({ message: "Reading all users post", data: user, status: 200 });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error reading all users post", status: 404 });
  }
};

export const ReadOnePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { postID } = req.params;
    const user = await postModel.findById(postID).populate({
      path: "posts",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Reading user post", data: user, status: 200 });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error reading  user post", status: 404 });
  }
};

export const DelateOnePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await postModel.findOneAndDelete();

    return res.status(200).json();
  } catch (error) {
    return res.status(404).json({ message: error, status: 404 });
  }
};

export const readMainPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user: any = await userModel.findById(userID);

    const friends = [...user.friends, userID];

    const post = await postModel.find();

    let showPost = [];

    for (let i of post) {
      for (let e of friends) {
        if (i.userID === e) {
          showPost.push(i);
        }
      }
    }

    return res.status(200).json({
      status: 200,
      data: showPost.sort((a: any, b: any) => a.createdAt + b.createdAt),
      message: "reading friends post",
    });
  } catch (error) {
    return res.status(404).json({ message: error, status: 404 });
  }
};

export const searchPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { search } = req.body;
    const user = await postModel.find({ title: search });

    return res.status(200).json();
  } catch (error) {
    return res.status(404).json({ message: error, status: 404 });
  }
};
