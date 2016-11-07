'use strict';
var angular = require('angular');

var MainConfig = function ($locationProvider) {
    $locationProvider.html5Mode(true);
}

angular.module('Calculator', [])
    .config(['$locationProvider', MainConfig]);

require('./calculator.controller.js');
require('./calculator.service.js');