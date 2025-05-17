const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const chunkSize = 1024 * 1024; // 1MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  let startByte = 0;
  for (let i = 1; i <= totalChunks; i++) {
    const endByte = Math.min(startByte + chunkSize, file.size);
    const chunk = file.slice(startByte, endByte);
    await uploadChunk(chunk, totalChunks, i);
    startByte = endByte;
  }
  console.log("Upload complete");
});
async function uploadChunk(chunk, totalChunks, currentChunk) {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("totalChunks", totalChunks);
  formData.append("currentChunk", currentChunk);
  formData.append("filename", fileInput.files[0].name); // Add original filename
  const response = await fetch("/upload/chunk", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Chunk upload failed");
  }
}
