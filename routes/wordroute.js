import { Router } from "express";
import { getWord, submitWord } from "../controllers/wordcontoller.js";

const wordRouter = Router();

wordRouter.get("/", getWord);
wordRouter.post("/", submitWord);

export default wordRouter;
