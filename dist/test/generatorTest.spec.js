'use strict';

var _BaseGenerator = require('../bin/BaseGenerator');

var _BaseGenerator2 = _interopRequireDefault(_BaseGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = require('japa');
var path = require('path');

test.group('Generator', function (group) {
  group.beforeEach(function () {});

  test('throw exception when file already exists', async function (assert) {
    assert.plan(1);
    var gen = new _BaseGenerator2.default();
    await gen.generateFile(path.join(__dirname, 'sample.js'), 'module.exports = \'{{ name }}\'', { name: 'virk' });

    try {
      await gen.generateFile(path.join(__dirname, 'sample.js'), 'module.exports = \'{{ name }}\'', { name: 'virk' });
    } catch (_ref) {
      var message = _ref.message;

      assert.match(message, /already exists/);
    }

    await gen.removeFile(path.join(__dirname, 'sample.js'));
  });
});