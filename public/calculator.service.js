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

    self.updateExpression = function () {
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

    self.enterOperand = function (op) {
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

    self.calculate = function () {
        // change state
        if (state == 'operand') {
            operand.push(input);
        }
        state = 'operand';
        // update expression to view
        self.updateExpression();
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