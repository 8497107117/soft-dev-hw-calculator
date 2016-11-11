'use strict';
var angular = require('angular');

var CalculatorService = function () {
    var expression = '0';
    var operand = [];
    var operator = [];
    var state = 'operand';
    var input = '0';
    var answer = '0';
    var isCalculated = false;

    var self = this;

    self.clearC = function () {
        // only clearC the operand
        if (state == 'operand') {
            if (operand.length > 0) {
                state = 'operator';
                var tmp = operator.pop();
                input = tmp == undefined ? '' : tmp;
            }
            // first operand
            else {
                input = '0';
            }
        }
    }

    self.clearCE = function () {
        expression = '0';
        operand = [];
        operator = [];
        state = 'operand';
        input = '0';
        answer = '0';
        isCalculated = false;
    }

    self.updateExpression = function (radix) {
        if (radix == undefined || radix == 10) {
            if (operand[0] == undefined) {
                return input;
            }
            expression = operand[0];
            for (var i = 0; i < operator.length; i++) {
                if (operand[i + 1] != undefined) {
                    expression = expression + operator[i] + operand[i + 1];
                }
                else {
                    expression += operator[i];
                }
            }
            return expression + input;
        }
        else {
            if (operand[0] == undefined) {
                return input;
            }
            expression = parseInt(operand[0], radix).toString(10);
            for (var i = 0; i < operator.length; i++) {
                if (operand[i + 1] != undefined) {
                    expression = expression + operator[i] + parseInt(operand[i + 1], radix).toString(10);
                }
                else {
                    expression += operator[i];
                }
            }
            return expression + parseInt(input, radix).toString(10);
        }
    }

    self.enterOperand = function (op, mode) {
        // avoid input
        if (mode == 'dec' && op >= 'a' && op <= 'f') {
            return;
        }
        else if (mode == 'oct' && (op >= 'a' && op <= 'f' || op == '8' || op == '9')) {
            return;
        }
        else if (mode == 'bin' && (op != '0' && op != '1' && op != 'neg')) {
            return;
        }
        // change state
        if (state == 'operator') {
            state = 'operand';
            operator.push(input);
            input = '0';
        }
        // input
        if (op != 'neg') {
            if (isCalculated) {
                input = '0';
                isCalculated = false;
            }
            // avoid from starting with 0 || first legal input
            if (input == '0') {
                input = op;
            }
            else {
                input += op;
            }
        }
        // negative
        else if (op == 'neg') {
            // do nothing
            if (input == '0') {
                ;
            }
            // - -> + 
            else if (input.indexOf('-') < 0) {
                input = '-' + input;
            }
            // + -> -
            else {
                input = input.substr(1, input.length - 1);
            }
        }
    }

    self.enterOperator = function (op) {
        // use last answer to be operand
        if (isCalculated) {
            isCalculated = false;
        }
        // change state
        if (state == 'operand') {
            state = 'operator';
            operand.push(input);
            input = '';
        }
        // input
        input = op;
    }

    self.backspace = function () {
        // only backspace the operand
        if (state == 'operand' && input.length > 0) {
            input = input.substr(0, input.length - 1);
        }
        // check state
        if (state == 'operand' && (input.length == 0 || input == '-')) {
            if (operand.length > 0) {
                state = 'operator';
                var tmp = operator.pop();
                input = tmp == undefined ? '' : tmp;
            }
            // first operand
            else {
                input = '0';
            }
        }
    }

    self.calculate = function (mode) {
        // change state
        if (state == 'operand') {
            operand.push(input);
        }
        state = 'operand';
        // update expression to view
        if (mode == 'hex') {
            self.updateExpression(16);
        }
        else if (mode == 'dec') {
            self.updateExpression(10);
        }
        else if (mode == 'oct') {
            self.updateExpression(8);
        }
        else if (mode == 'bin') {
            self.updateExpression(2);
        }
        // answer & clear
        answer = eval(expression).toString();
        operand = [];
        operator = [];
        expression = answer;
        isCalculated = true;
        input = answer;

        return answer;
    }

    self.changeRadix = function (s, radix) {
        return (+s).toString(radix);
    }

    return self;
}

angular.module('Calculator')
    .factory('CalculatorService', [CalculatorService]);