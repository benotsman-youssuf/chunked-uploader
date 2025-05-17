import fs from "node:fs";
import path from "node:path";
import assembleChunks from "../utils/assemble.util.js";
export const uploadFile = async (req, res) => {
  try {
    const {
      file,
      body: { totalChunks, currentChunk },
    } = req;
    if (!file || !totalChunks || !currentChunk) {
      return res.status(400).json({ error: "missing required fields" });
    }
    const chunkFilename = `${file.originalname}.${currentChunk}`;
    const chunkPath = `./chunks/${chunkFilename}`;
    await fs.promises.rename(file.path, chunkPath);

    if (+currentChunk === +totalChunks) {
      assembleChunks(file.originalname, totalChunks);
    }
    res.status(200).json({ message: "Chunk uploaded successfully" });
  } catch (error) {
    console.error("Error handling chunk upload:", error);
    res
      .status(500)
      .json({ error: "Internal server error during chunk upload" });
  }
};
