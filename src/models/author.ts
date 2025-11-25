import { model, Schema } from "mongoose";

const authorSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
});

const Author = model("Author", authorSchema);

export default Author;
