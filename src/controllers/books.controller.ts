import type { Request, Response, NextFunction } from "express";
import Books from "../models/books";
import errorHandler from "../middlewares/errorHandler";

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Books.find().populate("author").populate("categories");
    res.status(200).json({ message: "Books found successfully" });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Books.findById(req.params.id).populate("books");
    res.status(200).json({ message: "Book found successfully" });
  } catch (error) {
    next(error);
  }
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // name , id for the author , categories
    const newBook = await Books.create(req.body);
    res.status(201).json({ message: "Book created successfully", newBook });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
