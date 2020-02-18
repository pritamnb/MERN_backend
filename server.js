const express = require('express');
const mongoose = require('mongoose');

const users = require('./router/api/users');
const profile = require('./router/api/profile');

const posts = require('./router/api/post');
const app = express();
// DB config
const db = require('./config/keys').mongoURI;
// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
app.get('/', (req, res) => res.send('hello'));

// use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
