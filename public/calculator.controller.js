'use strict';
var angular = require('angular');

var CalculatorController = function(CalculatorService) {
    var self = this;

    var Cal = CalculatorService;

    // Radix
    self.radix = { 'hex': 16, 'dec': 10, 'oct': 8, 'bin': 2 };
    // Mode
    self.mode = 'dec';

    self.changeMode = function(mode) {
        Cal.changeMode(self.radix[self.mode], self.radix[mode]);
        self.mode = mode;
        self.answer = Cal.updateExpression();
    }

    self.modeClass = function(mode) {
        return {
            focus: mode == self.mode,
            blur: mode != self.mode
        };
    }
    // Clear
    self.clearCE = function() {
        Cal.clearCE();
        self.answer = Cal.updateExpression();
    }

    self.clearC = function() {
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
    self.disable = function(op) {
        // avoid input
        if (self.mode == 'dec' && op >= 'a' && op <= 'f') {
            return true;
        }
        else if (self.mode == 'oct' && (op >= 'a' && op <= 'f' || op == '8' || op == '9')) {
            return true;
        }
        else if (self.mode == 'bin' && (op != '0' && op != '1' && op != 'neg')) {
            return true;
        }
        else {
            return false;
        }
    }

    self.enterOperand = function(op) {
        Cal.enterOperand(op);
        self.answer = Cal.updateExpression();
    }

    self.enterOperator = function(op) {
        Cal.enterOperator(op);
        self.answer = Cal.updateExpression();
    }

    self.backspace = function() {
        Cal.backspace();
        self.answer = Cal.updateExpression();
    }

    self.calculate = function() {
        self.dec = Cal.calculate(self.radix[self.mode]);
        self.hex = Cal.changeRadix(self.dec, 16);
        self.oct = Cal.changeRadix(self.dec, 8);
        self.bin = Cal.changeRadix(self.dec, 2);
        self.answer = self[self.mode];
    }
}

angular.module('Calculator')
    .controller('CalculatorController', ['CalculatorService', CalculatorController]);