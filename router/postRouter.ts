import { Router } from "express";
import { createPost, readMainPost } from "../controller/postController";
import { upload } from "../utils/multer";

const router: any = Router();

router.route("/create-post/:userID").post(upload, createPost);
router.route("/read-post/:userID").get(readMainPost);

export default router;
