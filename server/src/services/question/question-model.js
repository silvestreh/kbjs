'use strict';

// question-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        en: { type: String, required: true },
        es: { type: String },
        pt: { type: String }
    },
    answer: {
        en: { type: String, required: true },
        es: { type: String },
        pt: { type: String }
    },
    draft: { type: Boolean, 'default': true },
    categories: [{ type: Schema.Types.ObjectId, required: true, ref: 'category' }],
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
});

const questionModel = mongoose.model('question', questionSchema);

module.exports = questionModel;
