import asyncHandler from "express-async-handler";
import Word from "../models/Words.js";
import { createError } from "../utils/error.js";

export const getWord = asyncHandler(async (req, res, next) => {
  const words = await Word.find();

  let arr = [];

  words.forEach((item, index) => {
    // arr.push([...item.words]);
    item.words.map((item) => {
      arr.push(item);
    });
    // arr.concat(arr, item.words);
  });
  console.log(arr);
  //   var merged = [].concat.apply([], arr);
  //   const merged = arr.flat(1);

  const unique = [...new Set(arr)];

  return res.status(200).json({
    success: true,
    badwords: unique,
  });
});

export const submitWord = asyncHandler(async (req, res, next) => {
  const { name = "Anonymous", words } = req.body;

  const same = await Word.findOne({ words });

  if (same) {
    return next(createError(400, "Same words is many times!"));
  }

  if (!words) {
    return next(createError(400, "Words is required!"));
  }

  const word = await Word.create({
    name,
    words,
  });

  return res.status(200).json({
    success: true,
    message: "Thanks for your contribution...",
  });
});
