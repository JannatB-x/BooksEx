import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller";
import upload from "../middlewares/uploads";

const router = express.Router();
router.get("/", getAllBooks);
router.post("/", upload.single("image"), createBook);
router.get("/:id", getBookById);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
