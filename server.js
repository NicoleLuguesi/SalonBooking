const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
