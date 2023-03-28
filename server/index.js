const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const routes = require('./routes/web.js');

// Init express
const app = express();

// Stores server port number
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 1024 * 1024 }, // 1MB
    abortOnLimit: true,
  })
);

// Init routes
app.use('/', routes);

// Catch-all middleware for unmatched routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
    },
  });
});

// Start server
app.listen(PORT, () => `Server started on http://localhost:${PORT}`);
