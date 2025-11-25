import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  Categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Books = model("Books", bookSchema);

export default Books;
