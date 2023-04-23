import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import communityRoutes from "./routes/Community.js";

const app = express();

dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Stack Overflow Server is Running");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/community", communityRoutes);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on Port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
