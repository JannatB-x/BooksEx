import express from "express";
import {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controller";

const router = express.Router();
router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorById);

export default router;
