import User from "../models/auth.js";
import mongoose from "mongoose";

//get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Follow Request
export const followUsers = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (userId !== _id) {
    try {
      const user = await User.findById(_id);
      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: _id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};
// Unfollow Request
export const unFollowUsers = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (userId !== _id) {
    try {
      const user = await User.findById(_id);
      const currentUser = await User.findById(userId);

      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: _id } });
        res.status(200).json("user has been unfollowed successfully");
      } else {
        res.status(403).json("you have not follow this user yet");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
};
