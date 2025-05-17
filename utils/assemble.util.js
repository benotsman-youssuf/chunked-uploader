import fs from "node:fs";

const assembleChunks = async (filename, totalChunks) => {
  const outputPath = `./uploads/${filename}`;
  const writeStream = fs.createWriteStream(outputPath);

  try {
    for (let i = 1; i <= totalChunks; i++) {
      const chunkPath = `./chunks/${filename}.${i}`;
      const data = await fs.promises.readFile(chunkPath);
      writeStream.write(data);
      await fs.promises.unlink(chunkPath);
    }
    writeStream.end();
  } catch (error) {
    console.error('Error assembling chunks:', error);
    writeStream.destroy();
    throw error;
  }
};

export default assembleChunks;
