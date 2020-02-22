const express = require('express');
const passport = require('passport');

const app = express();
// passport middleeware
app.use(passport.initialize());

// passport Config
require('./config/passport.js')(passport);
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
