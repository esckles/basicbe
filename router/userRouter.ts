import { Router } from "express";
import {
  createUser,
  readAllUser,
  readOneUser,
  signInUser,
} from "../controller/userController";
import { addAsFriend, unFriend } from "../controller/friendController";
import { upload } from "../utils/multer";

const router: any = Router();

router.route("/create-user").post(upload, createUser);
router.route("/sign-user").post(signInUser);

router.route("/one-user/:userID").get(readOneUser);
router.route("/users").get(readAllUser);

// friends
router.route("/add-friend/:userID/:friendID").patch(addAsFriend);
router.route("/un-friend/:userID/:friendID").patch(unFriend);

export default router;
