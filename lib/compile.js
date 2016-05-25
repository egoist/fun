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
        return compileWord(exp)
      default:
        throw new Error('Unknown expression')
    }
  }

  function compileApply(exp) {
    switch (exp.operator.name) {
      case 'do':
        return exp.args.map(function (arg) {
          return ';' + compileExp(arg)
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
          return arg.type === 'word' ?
            arg.name :
            compileExp(arg)
        }).join(', ') + ');'
      case 'let':
        return 'var ' + exp.args[0].name + ' = ' + compileExp(exp.args[1]) + ';'
      case 'if':
        function getIf(condition, body) {
          return 'if (' + compileExp(condition) + ') {\n' +
            compileExp(body) +
            '\n}\n'
        }
        var res =  getIf(exp.args[0], exp.args[1])
        if (exp.args[2]) {
          res += ' else {' + compileExp(exp.args[2]) + '}'
        }
        return res
      case '>':
      case '<':
      case '<=':
      case '>=':
      case '==':
        var name = exp.operator.name === '==' ? '===' : exp.operator.name
        return '(' +
          compileExp(exp.args[0]) +
          name +
          compileExp(exp.args[1]) +
          ')'
      default:
        console.log('unknown function')
    }
  }

  function compileValue(exp) {
    return JSON.stringify(exp.value)
  }

  function compileWord(exp) {
    return exp.name
  }

  return compileExp(ast)
}

module.exports = compile
