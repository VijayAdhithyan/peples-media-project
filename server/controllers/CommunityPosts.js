import Post from "../models/CommunityPost.js";
import User from "../models/auth.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

//Create a Post Request Desc

export const userPostDesc = async (req, res) => {
  const { userId, desc } = req.body;
  try {
    const newPost = new Post({ userId, desc });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a Post Request Img

export const userPostImg = async (req, res) => {
  const { userId, desc, img } = req.body;

  try {
    if (img) {
      const uploadRes = await cloudinary.uploader.upload(img, {
        upload_preset: "community-posts",
      });
      if (uploadRes) {
        const newPost = new Post({ userId, desc, img: uploadRes });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create a Post Request Video

export const userPostVideo = async (req, res) => {
  const { userId, desc, video } = req.body;

  try {
    if (video) {
      const uploadRes = await cloudinary.uploader.upload(video, {
        upload_preset: "community-posts",
        resource_type: "video",
      });
      if (uploadRes) {
        const newPost = new Post({ userId, desc, video: uploadRes });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a post

export const deleteUserPost = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(_id);
    if (userId === post.userId) {
      await post.deleteOne();
      res.status(200).json("post deleted successfuly");
    } else {
      res.status(403).json("you are not able delete others post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like & dislike a post

export const postLikeDislike = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(_id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//get a post

export const getPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get All post

export const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find();
    res.status(200).json(allPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user post

export const getUserPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id);
    const post = await Post.find({ userId: user._id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get followers

export const followers = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const followersId = await User.findById(_id);
    const followers = await Promise.all(
      followersId.followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    let followList = [];
    followers.map((follower) => {
      const { _id, name, followers, followings } = follower;
      followList.push({ _id, name, followers, followings });
    });
    res.status(200).json(followList);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get followings

export const followings = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const followingsId = await User.findById(_id);
    const followings = await Promise.all(
      followingsId.followings.map((followingId) => {
        return User.findById(followingId);
      })
    );
    let followList = [];
    followings.map((following) => {
      const { _id, name, followers, followings } = following;
      followList.push({ _id, name, followers, followings });
    });
    res.status(200).json(followList);
  } catch (error) {
    res.status(500).json(error);
  }
};
