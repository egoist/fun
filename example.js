'use strict'
const compile = require('./lib/compile')

const input = `
do(
  %(+(1, *(2, -(1, 3))),2),
  println(/(3, 2), +(1, 2)),
  println(2),
  let(foo, +(1, 2, -(3, 4))),
  println(foo)
)
`
console.log(compile(input))
