'use strict';
var angular = require('angular');

var CalculatorService = function() {
    var expression = '0';
    var operand = [];
    var operator = [];
    var state = 'operand';
    var input = '0';
    var answer = '0';
    var isCalculated = false;

    var self = this;

    self.clearCE = function() {
        // only clearCE the operand
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

    self.clearC = function() {
        expression = '0';
        operand = [];
        operator = [];
        state = 'operand';
        input = '0';
        answer = '0';
        isCalculated = false;
    }

    self.updateExpression = function(base, toCal) {
        // Calculate || dec
        if (toCal || base == 10) {
            if (operand[0] == undefined) {
                return input;
            }
            expression = parseInt(operand[0], base).toString(10);
            for (var i = 0; i < operator.length; i++) {
                if (operand[i + 1] != undefined) {
                    expression = expression + operator[i] + parseInt(operand[i + 1], base).toString(10);
                }
                else {
                    expression += operator[i];
                }
            }
            return expression + input;
        }
        // View
        else {
            if (operand[0] == undefined && base != 10) {
                return ((parseInt(input, base) & 0xFFFF) >>> 0).toString(base).toUpperCase();
            }
            expression = ((parseInt(operand[0], base) & 0xFFFF) >>> 0).toString(base).toUpperCase();
            for (var i = 0; i < operator.length; i++) {
                if (operand[i + 1] != undefined) {
                    expression = expression + operator[i] + ((parseInt(operand[i + 1], base) & 0xFFFF) >>> 0).toString(base).toUpperCase();
                }
                else {
                    expression += operator[i];
                }
            }
            if (state == 'operand') {
                return expression + ((parseInt(input, base) & 0xFFFF) >>> 0).toString(base).toUpperCase();
            }
            else {
                return expression + input;
            }
        }
    }

    self.enterOperand = function(op) {
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
            // + -> -
            else if (input.indexOf('-') < 0) {
                if (operator.length > 0 && operator[operator.length - 1] == '-') {
                    operator[operator.length - 1] = '+';
                }
                else {
                    input = '-' + input;
                }
            }
            // - -> + || !dec
            else {
                input = input.substr(1, input.length - 1);
            }
        }
    }

    self.enterOperator = function(op) {
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

    self.backspace = function() {
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

    self.calculate = function(base) {
        // change state
        if (state == 'operand') {
            operand.push(input);
        }
        state = 'operand';
        // update expression to view
        self.updateExpression(base, true);
        // answer & clear
        answer = eval(expression).toString();
        operand = [];
        operator = [];
        expression = answer;
        isCalculated = true;
        input = parseInt(answer, 10).toString(base);

        return answer;
    }

    self.changeBase = function(s, base, toBase) {
        return ((parseInt(s, base) & 0xFFFF) >>> 0).toString(toBase).toUpperCase();
    }

    self.changeMode = function(oldBase, newBase) {
        for (var i = 0; i < operand.length; i++) {
            operand[i] = parseInt(operand[i], oldBase).toString(newBase);
        }
        input = parseInt(input, oldBase).toString(newBase);
    }

    return self;
}

angular.module('Calculator')
    .factory('CalculatorService', [CalculatorService]);