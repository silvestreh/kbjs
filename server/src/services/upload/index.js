'use strict';

const hooks = require('./hooks');
const AWS = require('aws-sdk');
const Store = require('s3-blob-store');
const multer = require('multer');
const multipartMiddleware = multer();
const BlobService = require('feathers-blob');

module.exports = function () {
    const app = this;
    const s3 = new AWS.S3({
        accessKeyId: process.env.KBJS_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.KBJS_AWS_SECRET_ACCESS_KEY,
    });
    const blobStore = Store({
        client: s3,
        bucket: process.env.KBJS_AWS_BUCKET
    });

    const blobService = BlobService({
        Model: blobStore
    });

    // Initialize our service with any options it requires
    app.use('/uploads',
        multipartMiddleware.single('uri'),
        function (req, res, next) {
            req.feathers.file = req.file;
            next();
        },
        blobService
    );

    // Get our initialize service to that we can bind hooks
    const uploadService = app.service('/uploads');

    // Set up our hooks
    uploadService.before(hooks.before);
    uploadService.after(hooks.after);
};
