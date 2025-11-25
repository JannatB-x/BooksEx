import express from "express";
import connectDB from "./database";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authorRoutes from "./routes/author.router";
import booksRoutes from "./routes/books.router";
import categoriesRoutes from "./routes/categories.router";
import uploadRoutes from "./routes/upload.router";
import morgan from "morgan";
import cors from "cors";
import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// Database connection (non-blocking)
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      console.log("Server will continue without database connection");
    });
} else {
  console.warn("Warning: MONGO_URI not found in environment variables");
}

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Static files - handle __dirname for TypeScript
const uploadsPath = path.join(process.cwd(), "uploads");
app.use(`/uploads`, express.static(uploadsPath));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API",
    endpoints: {
      authors: "/authors",
      books: "/books",
      categories: "/categories",
      upload: "/upload",
    },
  });
});

// Routes
app.use("/authors", authorRoutes);
app.use("/books", booksRoutes);
app.use("/categories", categoriesRoutes);
app.use("/upload", uploadRoutes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
