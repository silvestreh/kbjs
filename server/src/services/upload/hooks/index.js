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
    create: [
        function(hook) {
            hook.result.imageURI = `https://${process.env.KBJS_AWS_BUCKET}.s3.amazonaws.com/${hook.result.id}`;
        }
    ],
    update: [],
    patch: [],
    remove: []
};
