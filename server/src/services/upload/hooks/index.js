'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const dauria = require('dauria');

exports.before = {
    all: [],
    find: [],
    get: [],
    create: [
        auth.restrictToAuthenticated(),
        function(hook) {
            hook.params.s3 = { ACL: 'public-read' };

            if (!hook.data.uri && hook.params.file){
                const file = hook.params.file;
                const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
                hook.data = { uri };
            }
        }
    ],
    update: [],
    patch: [],
    remove: []
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
