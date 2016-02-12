# inferno-helpers
Sugar syntax for creating inferno virtual DOM elements

Inspired by this [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) 

To use 

```javascript
let { div, p } = require('inferno-helpers')

let childNode = p('.class', 'Hello', { style: { marginLeft:200 } })

let parentNode = div(childNode, '.class1 #id .otherClass', 'Hello again!')

let template = createTemplate( () => parentNode )

import InfernoDOM from 'inferno-dom'
InfernoDOM.render(template(), document.getElementById('app'))
```

Arguments (can pass any number of them and in any order):
- selector: class or id (string that starts with . or #).
- attributes: object.
- children: another element, a string or an array of strings or elements.
NOTE: if need to pass a child string that starts with . or #, wrap it in []

