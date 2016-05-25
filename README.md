# fun

[A simple functional programming language for fun.](http://eloquentjavascript.net/11_language.html)

## Implemented

```js
// prgram entry
do

// arithmetic
+ - * / %

// log
println
```

## Compile to JS

```js
const compile = require('./lib/compile')

const js_code = compile(`

do(
  let(
    foo,
    +(1, 2, -(3, 4))
  ),
  println(foo)
)

`)

console.log(js_code)
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
