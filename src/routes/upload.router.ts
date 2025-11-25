import express from "express";
import { Request, Response, NextFunction } from "express";
import upload from "../middlewares/uploads";

const router = express.Router();

// Single file upload
router.post(
  "/single",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      res.json({
        message: "File uploaded successfully",
        file: {
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype,
          url: `/uploads/${req.file.filename}`, // URL to access the file
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Multiple files upload (max 10)
router.post(
  "/multiple",
  upload.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || req.files.length === 0) {
        res.status(400).json({ error: "No files uploaded" });
        return;
      }

      const files = (req.files as Express.Multer.File[]).map((file) => ({
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/${file.filename}`,
      }));

      res.json({
        message: "Files uploaded successfully",
        files,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
