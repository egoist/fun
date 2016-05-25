'use strict'
var parse = require('./parse')

function compile(input) {
  var ast = parse(input)
  if (ast.type !== 'apply') {
    throw new Error('Program must be wrapped in the do function')
  }

  function compileExp(exp) {
    switch (exp.type) {
      case 'apply':
        return compileApply(exp)
      case 'value':
        return compileValue(exp)
      case 'word':
        return compileValue(exp)
      default:
        throw new Error('Unknown expression')
    }
  }

  function compileApply(exp) {
    switch (exp.operator.name) {
      case 'do':
        return exp.args.map(function (arg) {
          return compileExp(arg)
        }).join('\n')
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        return '(' + exp.args.map(function (arg) {
          return compileExp(arg)
        }).join(exp.operator.name) + ')'
      case 'println':
        return 'console.log(' + exp.args.map(function (arg) {
          return arg.type === 'word'
            ? arg.name
            : compileExp(arg)
        }).join(', ') + ')'
      case 'let':
        return 'var ' + exp.args[0].name + ' = ' + compileExp(exp.args[1])
      default:
        console.log('custom function')
    }
  }

  function compileValue(exp) {
    return JSON.stringify(exp.value)
  }

  return compileExp(ast)
}

module.exports = compile
