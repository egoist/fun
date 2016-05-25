'use strict'
const compile = require('./lib/compile')

const input = `
do(
  %(+(1, *(2, -(1, 3))),2),
  println(/(3, 2), +(1, 2)),
  >=(1, 0),
  println(2),
  if(==(1, "1"), println("equal")),
  let(foo, +(1, 2, -(3, 4))),
  println(foo),
  if(
    >(foo, 10),
    println("big"),
    if(<(foo, 0),
      println("too small"),
      println("relative small")))
)
`
console.log(compile(input))
