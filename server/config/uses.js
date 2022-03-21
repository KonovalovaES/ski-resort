const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

function uses(app) {
  app.use(logger('dev'));
  app.use(express.static('src'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());
}

module.exports = uses;
