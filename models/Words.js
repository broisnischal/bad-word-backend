import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Anonymous",
  },

  words: {
    type: [String],
  },
});

const Word = mongoose.model("Word", wordSchema);
export default Word;
