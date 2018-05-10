# tar-checksum

Asynchronously generates deterministic checksums of .tar or .tar.gz files.

## Installing

Using npm:

```bash
$ npm install tar-checksum --save
```

## Usage

```javascript
const tarChecksum = require('tar-checksum');
```

### Callback

```javascript
tarChecksum(Buffer|ReadableStream, (err, file) => {

  // handle results

})
```

### Promise

```javascript
tarChecksum(Buffer|ReadableStream)
  .then(checksum => {  
    // handle results
  })
  .catch(err => { 
    // handle err
  })
```

### Async/await

```javascript
try {
  let checksum = await tarChecksum(Buffer|ReadableStream)
} catch (err) {
  // handle err
}
```
