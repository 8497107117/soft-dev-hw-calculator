'use strict';
var angular = require('angular');

var CalculatorController = function (CalculatorService) {
    var self = this;

    var Cal = CalculatorService;

    self.answer = '0';
    self.dec = 0;

    self.enterOperand = function (op) {
        self.answer = Cal.enterOperand(op);
    }

    self.enterOperator = function (op) {
        self.answer = Cal.enterOperator(op);
    }

    self.calculate = function () {
        self.answer = Cal.calculate();
        self.dec = self.answer;
    }
}

angular.module('Calculator')
    .controller('CalculatorController', ['CalculatorService', CalculatorController]);