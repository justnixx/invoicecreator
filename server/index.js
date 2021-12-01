import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pdf from "html-pdf";

// Initialize express
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/create", (req, res) => {
  res.send("POST: ok");
});

app.get("/send", (req, res) => {
  res.send("GET: ok");
});

// Start server
app.listen(PORT, () => `Server started on http://localhost:${PORT}`);
