'use strict';
var angular = require('angular');

var CalculatorController = function (CalculatorService) {
    var self = this;

    var Cal = CalculatorService;

    // Clear
    self.clearCE = function () {
        Cal.clearCE();
        self.answer = Cal.updateExpression();
    }

    self.clearC = function () {
        Cal.clearC();
        self.answer = Cal.updateExpression();
        self.dec = self.answer;
        self.hex = Cal.changeRadix(self.answer, 16);
        self.oct = Cal.changeRadix(self.answer, 8);
        self.bin = Cal.changeRadix(self.answer, 2);
    }
    // initiallize
    self.clearC();
    // Input
    self.enterOperand = function (op, mode) {
        Cal.enterOperand(op, mode);
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
        self.dec = Cal.calculate(self.mode);
        self.hex = Cal.changeRadix(self.dec, 16);
        self.oct = Cal.changeRadix(self.dec, 8);
        self.bin = Cal.changeRadix(self.dec, 2);
        self.answer = self[self.mode];
    }
    // Mode
    self.mode = 'dec';

    self.changeMode = function (mode) {
        Cal.changeMode(self.mode, mode);
        self.mode = mode;
        self.answer = Cal.updateExpression();
    }

    self.modeClass = function (mode) {
        return {
            focus: mode == self.mode,
            blur: mode != self.mode
        };
    }
}

angular.module('Calculator')
    .controller('CalculatorController', ['CalculatorService', CalculatorController]);