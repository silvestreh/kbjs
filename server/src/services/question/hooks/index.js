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
    find: [
        hooks.populate('categories', {
            service: 'categories',
            field: 'categories'
        })
    ],
    get: [
        hooks.populate('categories', {
            service: 'categories',
            field: 'categories'
        })
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
};
