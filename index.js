const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kartika12!",
    database: "users"
});

db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("connected");
});

// Health Check
app.get("/", (req, res) => {
    res.json({
        responseCode: "00",
        responseMessage: "Success",
        responseDescription: "Hello, World!"
    });
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const query = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(query, [name, email, password], (err) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Register Success"
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(query, [email, password], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Login Failed"
            });
        }

        res.json({
            message: "Login Success"
        });
    });
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});