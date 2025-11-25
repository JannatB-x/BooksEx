import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  Name: {
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

const Category = model("Category", categorySchema);

export default Category;
