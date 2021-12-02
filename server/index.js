import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import { createInvoice, sendInvoice } from "./controllers/invoice.js";

// Initialize express
const app = express();

// Stores server port number
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 1024 * 1024 }, // 1MB
    abortOnLimit: true,
  })
);

// Routes
app.post("/create", createInvoice);

app.get("/download", sendInvoice);

// Start server
app.listen(PORT, () => `Server started on http://localhost:${PORT}`);
