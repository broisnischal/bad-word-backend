import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import wordRouter from "./routes/wordroute.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const ConnectDB = (url) => {
  mongoose
    .connect(url)
    .then(console.log("DB connected 🚀"))
    .catch((err) => {
      if (err) throw err;
    });
};

// routes
app.use("/api/v1/words", wordRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    error: true,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT} 🔥`);
  ConnectDB(process.env.MONGO);
});
