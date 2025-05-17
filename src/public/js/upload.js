const fileInput = document.getElementById("file-input");
const progress = document.getElementById("progress");
const files = document.getElementById("uploaded-files")

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

    const percent = (i / totalChunks) * 100;
    const barLength = 50;
    const asterisks = '*'.repeat(Math.round((percent / 100) * barLength));
    const spaces = ' '.repeat(barLength - asterisks.length);
    progress.textContent = `[${asterisks}${spaces}] ${Math.round(percent)}%`;
  }

  console.log("Upload complete");
  getFiles()
});

async function uploadChunk(chunk, totalChunks, currentChunk) {
  const formData = new FormData();
  formData.append("filename", fileInput.files[0].name);
  formData.append("file", chunk);
  formData.append("totalChunks", totalChunks);
  formData.append("currentChunk", currentChunk);

  const response = await fetch("/upload/chunk", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Chunk upload failed");
  }
}

async function getFiles(){
  const response = await fetch("/files");
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }
  const data = await response.json();
  files.innerHTML = "";
  data.files.forEach(filename => {
    const li = document.createElement("li");
    li.textContent = filename;
    files.appendChild(li);
  });
}

