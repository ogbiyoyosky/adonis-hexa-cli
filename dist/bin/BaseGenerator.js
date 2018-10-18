'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Git = require('nodegit');
var figlet = require('figlet');
var kleur = require('kleur');

var BaseGenerator = function () {
    function BaseGenerator() {
        _classCallCheck(this, BaseGenerator);
    }

    _createClass(BaseGenerator, [{
        key: 'cloneRepo',
        value: async function cloneRepo(repo, appName) {
            await Git.clone(repo, '' + appName);
        }
    }, {
        key: 'display',
        value: function display(appName, projectName) {
            console.log(kleur.green.bold.underline('-------------------------' + appName + '---------------------------'));

            figlet(projectName, function (err, data) {
                if (err) {
                    console.log(kleur.red.bold('something went wrong'));
                }
                console.log(data);
            });
        }
    }]);

    return BaseGenerator;
}();

exports.default = BaseGenerator;