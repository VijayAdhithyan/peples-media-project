import express from "express";
import {
  followUsers,
  unFollowUsers,
  getUser,
} from "../controllers/CommunityUsers.js";
import {
  userPostImg,
  userPostVideo,
  deleteUserPost,
  postLikeDislike,
  getPost,
  getAllPost,
  getUserPost,
  followers,
  followings,
  userPostDesc,
} from "../controllers/CommunityPosts.js";

const router = express.Router();

router.put("/:id/follow", followUsers);
router.put("/:id/unfollow", unFollowUsers);

router.put("/post/:id/like", postLikeDislike);
router.get("/getpost", getAllPost);
router.get("/profile/:id", getUserPost);
router.post("/posts/desc", userPostDesc);
router.post("/posts/img", userPostImg);
router.post("/posts/video", userPostVideo);
router.get("/followers/:id", followers);
router.get("/followings/:id", followings);
router.delete("/:id", deleteUserPost);
router.get("/:id", getUser);

router.get("/:id", getPost);

export default router;
