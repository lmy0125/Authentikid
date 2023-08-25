const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;
const MONGODB_URI = 'mongodb://127.0.0.1:27017';

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// User APIs
const User = require('./models/User');

app.post('/api/users', async (req, res) => {
	try {
		const { username, age } = req.body;
		const newUser = new User({ username, age });
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: 'Error creating user' });
	}
});

app.get('/api/users', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching users' });
	}
});


app.get('/api/example', (req, res) => {
	res.json(['Example Data 1', 'Example Data 2']);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
