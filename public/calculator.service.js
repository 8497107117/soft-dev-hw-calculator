'use strict';
var angular = require('angular');

var CalculatorService = function () {
    var expression = '';
    var state = 'operator';
    var input = '';
    var answer = 0;

    var self = this;

    self.enterOperand = function (op) {
        // change state
        if (state == 'operator') {
            state = 'operand';
            expression += input;
            input = '';
        }
        // input
        if (state == 'operand') {
            input += op;
        }

        return expression + input;
    }

    self.enterOperator = function (op) {
        // change state
        if (state == 'operand') {
            state = 'operator';
            expression += input;
            input = '';
        }
        // input
        if (state == 'operator') {
            input = op;
        }

        return expression + input;
    }

    self.calculate = function () {
        // change state
        if (state == 'operand') {
            state = 'operator';
            expression += input;
        }
        input = '';
        // answer & clear
        answer = eval(expression);
        expression = answer.toString();

        return answer;
    }

    return self;
}

angular.module('Calculator')
    .factory('CalculatorService', [CalculatorService]);