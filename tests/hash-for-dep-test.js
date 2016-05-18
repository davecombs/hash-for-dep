'use strict';
var path = require('path');
var assert = require('assert');
var hashForDep = require('../');

var fixturesPath = path.join(__dirname, 'fixtures');

describe('hashForDep', function() {
  it('Provides a consistent sha1 hash for a dependent package', function() {
    var hashTreeCallCount = 0;
    var hashTreePaths = [
      path.join(fixturesPath, '/node_modules/dedupped/'),
      path.join(fixturesPath, '/node_modules/dedupped/node_modules/dedupped-child/'),
      path.join(fixturesPath, '/node_modules/foo/')
    ];

    var result = hashForDep('foo', fixturesPath, function stableHashTreeOverride(statPath) {
      hashTreeCallCount++;
      assert.equal(statPath, hashTreePaths.shift(), 'hashTree override has correct path');
      return 42;
    });

    assert.equal(hashTreeCallCount, 3, 'hashTree override was called correct number of times');
    assert.equal(result, 'f7ea6f1a10c65f054dc3b094a693b0ff6d8f0fad', 'Expected sha1');
  });
});
