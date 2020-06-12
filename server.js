const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const { mongoUri } = require('./config');

app.use(cors());
app.use(express.json());

// Init Middleware
app.use(express.json({extended: false}));

const users = require('./routes/api/users');

//app.use('/api/users', users)

app.use('/', (req, res) => res.send('API is Running'));


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));

mongoose
.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to db"))
.catch((error) => console.error("Failed to connect to DB", error));





// app.use('/api/posts', require('./routes/api/posts'));
// app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
