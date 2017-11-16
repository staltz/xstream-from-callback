# `xstream-from-callback`

Convert a Node.js-style callback `(err, data): void` to an xstream Stream.

```
npm install xstream-from-callback
```

## usage

Note: this helper takes a *function* as input, and returns a *function*, similar to RxJS `bindNodeCallback`.

```js
import xsFromCallback from 'xstream-from-callback'
const fs = require('fs');

const stream = xsFromCallback(fs.readFile)('/etc/hosts')
```
