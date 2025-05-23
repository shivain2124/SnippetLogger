import mongoose from "mongoose";

const codeSnippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);

export default CodeSnippet;
