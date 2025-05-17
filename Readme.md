

## Features

- Upload large files in chunks (1MB per chunk by default)
- Assembles file chunks on the server after upload



## How It Works

1. **Frontend**:  
   - User selects a file.
   - The file is split into 1MB chunks and uploaded sequentially to the server.
   - Progress is shown with a progress bar.
   - After upload, the file list is refreshed.

2. **Backend**:  
   - Receives each chunk and stores it temporarily.
   - When all chunks are received, they are assembled into the final file.
   - Provides an endpoint to list all uploaded files.

## Usage

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm run dev
   ```

3. Open your browser and go to:
   ```
   http://localhost:3000
   ```

4. Upload a file and see progress. Uploaded files will appear in the list.

## Notes

- Uploaded files are stored in `src/uploads/`.
- Temporary chunks are stored in `chunks/` and deleted after assembly.
- Adjust chunk size in `src/public/js/upload.js` if needed.

---
