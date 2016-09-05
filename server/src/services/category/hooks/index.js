'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
    all: [],
    find: [],
    get: [],
    create: [
        auth.restrictToAuthenticated(),
    ],
    update: [
        auth.restrictToAuthenticated(),
    ],
    patch: [
        auth.restrictToAuthenticated(),
    ],
    remove: [
        auth.restrictToAuthenticated(),
    ]
};

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};
