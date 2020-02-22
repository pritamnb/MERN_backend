const express = require('express');
const users = require('../router/api/users');
const profile = require('../router/api/profile');
const posts = require('../router/api/post');
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/users', users);
  app.use('/api/profile', profile);
  app.use('/api/posts', posts);
};
