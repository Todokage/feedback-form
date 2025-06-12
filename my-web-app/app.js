const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours
function workingHoursMiddleware(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Sunday
    const hour = now.getHours();

    // Check if day is Monday(1) to Friday(5) and hour is between 9 and 17
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.status(503).send('<h1>Service Unavailable</h1><p>The website is only available during working hours (Monday to Friday, 9:00 - 17:00).</p>');
    }
}

// Apply the middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});