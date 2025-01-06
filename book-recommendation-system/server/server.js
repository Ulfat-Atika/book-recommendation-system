const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./books.db');

app.use(cors());
app.use(express.json());

// Get all books
app.get('/api/books', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(rows);
        }
    });
});

// Add a book
app.post('/api/books', (req, res) => {
    const { title, author, genre, rating } = req.body;
    if (!title || !author || !genre || !rating) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }

    const stmt = db.prepare(
        'INSERT INTO books (title, author, genre, rating) VALUES (?, ?, ?, ?)'
    );
    stmt.run([title, author, genre, rating], function (err) {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
    stmt.finalize();
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
