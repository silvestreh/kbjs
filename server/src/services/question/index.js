'use strict';

const service = require('feathers-mongoose');
const question = require('./question-model');
const hooks = require('./hooks');

module.exports = function () {
    const app = this;

    const options = {
        Model: question,
        paginate: {
            default: 25,
            max: 100
        }
    };

    // Initialize our service with any options it requires
    app.use('/questions', service(options));

    // Get our initialize service to that we can bind hooks
    const questionService = app.service('/questions');

    // Set up our before hooks
    questionService.before(hooks.before);

    // Set up our after hooks
    questionService.after(hooks.after);
};
