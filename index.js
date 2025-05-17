import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { uploadFile, getFiles } from "./src/controllers/controller.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure required directories exist
const uploadsDir = path.join("./src/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const chunksDir = path.join("./chunks");
if (!fs.existsSync(chunksDir)) {
  fs.mkdirSync(chunksDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    const filename = req.body.filename;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

app.post("/upload/chunk", upload.single("file"), uploadFile);
app.get("/files", getFiles);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
