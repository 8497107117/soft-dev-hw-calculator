'use strict';
var angular = require('angular');

var CalculatorController = function (CalculatorService) {
    var self = this;

    var Cal = CalculatorService;

    self.clearC = function () {
        Cal.clearC();
        self.answer = Cal.updateExpression();
    }

    self.clearCE = function () {
        Cal.clearCE();
        self.answer = Cal.updateExpression();
        self.dec = self.answer;
        self.hex = Cal.changeRadix(self.answer, 16);
        self.oct = Cal.changeRadix(self.answer, 8);
        self.bin = Cal.changeRadix(self.answer, 2);
    }

    // initiallize
    self.clearCE();

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
        self.hex = Cal.changeRadix(self.answer, 16);
        self.oct = Cal.changeRadix(self.answer, 8);
        self.bin = Cal.changeRadix(self.answer, 2);
    }
}

angular.module('Calculator')
    .controller('CalculatorController', ['CalculatorService', CalculatorController]);