const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports = () => {
  mongoose
    .connect('mongodb://localhost/mern', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB'));
};
