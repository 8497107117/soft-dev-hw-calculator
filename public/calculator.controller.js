'use strict';
var angular = require('angular');

var CalculatorController = function (CalculatorService) {
    var self = this;

    var Cal = CalculatorService;

    self.answer = Cal.updateExpression();
    self.dec = self.answer;

    self.enterOperand = function (op) {
        Cal.enterOperand(op);
        self.answer = Cal.updateExpression();
    }

    self.enterOperator = function (op) {
        Cal.enterOperator(op);
        self.answer = Cal.updateExpression();
    }

    self.backspace = function () {
        Cal.backspace();
        self.answer = Cal.updateExpression();
    }

    self.calculate = function () {
        self.answer = Cal.calculate();
        self.dec = self.answer;
    }
}

angular.module('Calculator')
    .controller('CalculatorController', ['CalculatorService', CalculatorController]);