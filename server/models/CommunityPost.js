import mongoose from "mongoose";

const CommunityPostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: Object,
    },
    video: {
      type: Object,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", CommunityPostSchema);
