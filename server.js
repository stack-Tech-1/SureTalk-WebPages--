const express = require('express');
const path = require('path');
const app = express();

// Middleware to disable caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Serve static files with HTML extension support
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: false // Disable automatic index.html serving
}));

// Handle all page routes 
const pages = ['terms', 'privacy', 'verify-email', 'recover-account', 'confirm-email-link'];
pages.forEach(page => {
  app.get([`/${page}`, `/${page}.html`], (req, res) => {
    res.sendFile(path.join(__dirname, `${page}.html`), {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  });
});

// Root route
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, '80', () => {
  console.log(`Server running on port ${PORT}`);
});
