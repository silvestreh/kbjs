'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('upload service', function() {
  it('registered the uploads service', () => {
    assert.ok(app.service('uploads'));
  });
});
