# tinyRamda

# tiny Ramda
* This is a simple transpiler, translating from a minimal syntax to Ramda
  * pipes are added
  * parentheses are added
  * commas are added
  * Indentation == two spaces
* The transpiler handles most of the 256 functions in Ramda
* The transpiler is not written in Ramda, please fork!
* See translated code in console.log
* Use `tr` to enter tinyRamda code. `tr` returns a function
```
tr`code`
```

## Debug

* Use `debug` or `dbg` to log data. 
* `debug` is similar to `R.tap`
* You can insert these lines everywhere.
* `dbg` gives a json one liner.
```
debug message
dbg message
```

## Usage
```
f = tr`
debug 'input'
split '\\n'
map split ','
transpose
map 
  splitAt 1
  apply objOf
debug 'output'
`
```

## Generated Javascript (to the console)

```
pipe(
  debug('input'),
  split('\\n'),
  map(split(',')),
  transpose,
  map(
    pipe(
      splitAt(1),
      apply(objOf),
    ),
  ),
  debug('output'),
)
```

## Calling  the function
```
f(data)
```
