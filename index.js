import express  from 'express'
import multer  from 'multer'
import cors from "cors"
import fs from "node:fs"
import { error } from 'node:console';
import { uploadFile } from './controllers/upload.controller.js';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Use filename from request body if available, else fallback to originalname
    cb(null, req.body.filename || file.originalname);
  }
});

const upload = multer({ storage: storage });
app.post('/upload/chunk', upload.single('file'),uploadFile );



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});