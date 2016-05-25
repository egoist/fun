'use strict'
const compile = require('./lib/compile')

const input = `
do(
  %(+(1, *(2, -(1, 3))),2),
  println(/(3, 2), +(1, 2))
)
`
console.log(compile(input))
