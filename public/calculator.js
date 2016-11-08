'use strict';
var angular = require('angular');

var MainConfig = function ($locationProvider) {
    $locationProvider.html5Mode(true);
}

angular.module('Calculator', [])
    .config(['$locationProvider', MainConfig]);

require('./calculator.service.js');
require('./calculator.controller.js');