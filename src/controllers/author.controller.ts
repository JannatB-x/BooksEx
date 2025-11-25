import type { Request, Response, NextFunction } from "express";
import Author from "../models/author";
import errorHandler from "../middlewares/errorHandler";

const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authors = await Author.find().populate("books");
    res.status(200).json(Authors);
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.params.id);
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("first");
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
