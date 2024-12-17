import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import cloudinary from "../utils/cloudinary";
import path from "node:path";
import fs from "node:fs";
import { removeFileUpload } from "../utils/removeFileUpload";

export const createUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { password, userName, email } = req.body;

    const folderPath = path.join(__dirname, "../uploads");

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id }: any = await cloudinary.uploader.upload(
      req.file.path
    );

    const user = await userModel.create({
      password: hashed,
      userName,
      email,
      avatar: secure_url,
      avatarID: public_id,
    });

    removeFileUpload(folderPath);

    return res.status(201).json({
      message: "creating user",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error creating user",
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return res.status(201).json({
          message: "login user",
          status: 201,
          data: user,
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "error reading user's password",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "error reading user's email address",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error creating user",
    });
  }
};

export const readOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "reading user",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error reading user",
    });
  }
};

export const readAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "reading all user",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error reading all user",
    });
  }
};
