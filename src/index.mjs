import {tr} from './tinyRamda.mjs'

const input = {
  "events": [
    {
      "tags": [
        "tag-name1:tag-value1",
        "tag-name2:tag-value2",
      ],
    },
    {
      "tags": [
        "tag-name1:tag-value3",
        "tag-name2:tag-value2",
        "tag-name3:tag-value2", 
      ],
    },
  ]
}

const expect = {
  "tag-name1": ["tag-value1","tag-value3"],
  "tag-name2": ["tag-value2"],
  "tag-name3": ["tag-value2"],
}

global.p = tr`
split ':'
over lensIndex(1),append __,[]
apply objOf
`

const f = tr`
prop 'events'
map
  prop 'tags'
  reduce useWith(mergeLeft,[identity,p]),{}
reduce mergeWith pipe concat,uniq
  {}
debug 'output'
`

f(input)
