import fs from "node:fs";
import path from "node:path";
import assembleChunks from "../utils/assemble.util.js";
import { addAbortListener } from "node:events";
export const uploadFile = async (req, res) => {
  try {
    const {
      file,
      body: { totalChunks, currentChunk, filename },
    } = req;
    if (!file || !totalChunks || !currentChunk) {
      return res.status(400).json({ error: "missing required fields" });
    }
    const chunkFilename = `${filename}.${currentChunk}`;
    const chunkPath = `./chunks/${chunkFilename}`;
    await fs.promises.rename(file.path, chunkPath);

    if (+currentChunk === +totalChunks) {
      assembleChunks(filename, totalChunks);
    }
    res.status(200).json({ message: "Chunk uploaded successfully" });
  } catch (error) {
    console.error("Error handling chunk upload:", error);
    res
      .status(500)
      .json({ error: "Internal server error during chunk upload" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const dir = path.join(process.cwd(), "src/uploads");
    const all = await fs.promises.readdir(dir);
    res.status(200).json({files:all});
  } catch (error) {
    console.error("Error reading uploads directory:", error);
    res.status(500).json({ error: "Failed to list uploaded files" });
  }
};