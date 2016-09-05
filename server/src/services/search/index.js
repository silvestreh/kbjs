'use strict';

const hooks = require('./hooks');
const Question = require('../question/question-model');

module.exports = function () {
    const app = this;

    // Initialize our service with any options it requires
    app.use('/search', {
        find(params) {
            const questionService = app.service('questions');
            const articleService = app.service('articles');
            const query = params.query.query;

            const questionQuery = {
                $or: [
                    { 'question.en': { $regex: query, $options: 'i' } },
                    { 'question.es': { $regex: query, $options: 'i' } },
                    { 'question.pt': { $regex: query, $options: 'i' } },
                    { 'answer.en': { $regex: query, $options: 'i' } },
                    { 'answer.es': { $regex: query, $options: 'i' } },
                    { 'answer.pt': { $regex: query, $options: 'i' } }
                ]
            };

            const articleQuery = {
                $or: [
                    { 'title.en': { $regex: query, $options: 'i' } },
                    { 'title.es': { $regex: query, $options: 'i' } },
                    { 'title.pt': { $regex: query, $options: 'i' } },
                    { 'content.en': { $regex: query, $options: 'i' } },
                    { 'content.es': { $regex: query, $options: 'i' } },
                    { 'content.pt': { $regex: query, $options: 'i' } }
                ]
            };

            const promises = [
                questionService.find({ query: questionQuery }).then(data => data.data),
                articleService.find({ query: articleQuery }).then(data => data.data),
            ];

            return Promise.all(promises).then(data => [].concat(... data));
        }
    });

    // Get our initialize service to that we can bind hooks
    const searchService = app.service('/search');

    // Set up our before hooks
    searchService.before(hooks.before);

    // Set up our after hooks
    searchService.after(hooks.after);
};
