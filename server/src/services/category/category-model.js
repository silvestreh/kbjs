'use strict';

// category-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        en: { type: String, required: true },
        es: { type: String },
        pt: { type: String }
    },
    for: { type: String, enum: ['article', 'question'], required: true },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
