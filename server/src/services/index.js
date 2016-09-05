'use strict';
const search = require('./search');
const upload = require('./upload');
const article = require('./article');
const category = require('./category');
const question = require('./question');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function () {
    const app = this;

    mongoose.connect(app.get('mongodb'));
    mongoose.Promise = global.Promise;

    app.configure(authentication);
    app.configure(user);
    app.configure(question);
    app.configure(category);
    app.configure(article);
    app.configure(upload);
    app.configure(search);
};
