'use strict';
var angular = require('angular');

var CalculatorController = function(CalculatorService) {
    var self = this;

    var Cal = CalculatorService;

    // Base
    self.base = { 'hex': 16, 'dec': 10, 'oct': 8, 'bin': 2 };
    // Mode
    self.mode = 'dec';

    self.changeMode = function(mode) {
        Cal.changeMode(self.base[self.mode], self.base[mode]);
        self.mode = mode;
        self.answer = Cal.updateExpression(self.base[self.mode]);
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
        self.answer = Cal.updateExpression(self.base[self.mode]);
    }

    self.clearC = function() {
        Cal.clearC();
        self.answer = Cal.updateExpression(self.base[self.mode]);
        self.dec = self.answer;
        self.hex = Cal.changeBase(self.answer, 10, 16);
        self.oct = Cal.changeBase(self.answer, 10, 8);
        self.bin = Cal.changeBase(self.answer, 10, 2);
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
        self.answer = Cal.updateExpression(self.base[self.mode]);
    }

    self.enterOperator = function(op) {
        Cal.enterOperator(op);
        self.answer = Cal.updateExpression(self.base[self.mode]);
    }

    self.backspace = function() {
        Cal.backspace();
        self.answer = Cal.updateExpression(self.base[self.mode]);
    }

    self.calculate = function() {
        self.dec = Cal.calculate(self.base[self.mode]);
        self.hex = Cal.changeBase(self.dec, 10, 16);
        self.oct = Cal.changeBase(self.dec, 10, 8);
        self.bin = Cal.changeBase(self.dec, 10, 2);
        self.answer = self[self.mode];
    }
}

angular.module('Calculator')
    .controller('CalculatorController', ['CalculatorService', CalculatorController]);