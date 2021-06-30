import {__,append,apply,concat,curry,head,identity,join,length,lensIndex,pipe,
	prop,map,mergeLeft,mergeWith,objOf,over,range,reduce,repeat,split,tail,uniq,useWith} from 'ramda'

function indent (level) {
  return join('',repeat('  ',level))
}

function insertPar (arr) {
  return length(arr) == 1 ? head(arr) : head(arr) + '(' + insertPar(tail(arr)) + ')'
}

function createNodes (tiny) {
  const lines = tiny.split('\n')
  let arr = lines.map(line => {
    let n = line.length
    line = line.trimStart()
    n = (n - line.length)/2
    line = insertPar(line.trim().split(' '))
    return {tx:line, in:n+1, cn:[]} // tExT, inDENT, cHILDREn
  })
  return [{tx:'pipe', in:0, cn:[]}].concat(arr)   
}

function fixChildren (arr) {
  for (const i of range(0,arr.length).reverse()) {
    for (const j of range(0,i).reverse()) {
      if (arr[j].in == arr[i].in - 1) {
        arr[j].cn.unshift(arr[i])
        break
      }
    }
  }
}

function insertPipes (arr) { 
  for (const i of range(1, arr.length)) {
    const node = arr[i]
    if (node.cn.length > 1) { // insert pipe if more than one child
      const pipe = {tx:'pipe', in:node.in + 1, cn:node.cn}
      node.cn = [pipe]
    }
  }
}

function traverze (level,node) {
  const children = node.cn
  const comma = children.length > 0 ? '(' : ','
  const intro = indent(level) + node.tx + comma + "\n"
  const middle = map(curry(traverze)(level + 1), children)
  const outro = children.length > 0 ? indent(level) + ')' + (level > 0 ? ',' : '') + '\n' : ''
  return intro + join('',middle) + outro
}
 
function tr (tiny) {
  const arr = createNodes(tiny[0].trim())
  fixChildren(arr)    
  insertPipes(arr)
  const code = traverze(0,arr[0]) 
  console.log(code)
  return eval(code)
}

function debug (tag,data) {
  //console.log(tag, ':', JSON.stringify(data, null, 2))
  console.log(tag, ':', data)
  return data
}

function dbg (tag,data) {
  console.log(tag, ':', JSON.stringify(data))
  return data
}

debug = curry(debug)
dbg = curry(dbg)

export {tr,debug,dbg}