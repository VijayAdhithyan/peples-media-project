import express from "express";
import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/Question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", auth, AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:id", auth, deleteQuestion);
router.patch("/vote/:id", auth, voteQuestion);

export default router;
