# signonce

a package with a shitty name for generating nonces and signatures

# Installation

```
npm i signonce
```

# Usage

```js
const signonce = require('signonce');

// generate a nonce
var nonce = signonce.generate64BitNonce();

// signature finder

// example 1: let it generate from a string
var obj = '{}';
var sig = signonce.sign(obj, nonce);

// example 1.5: let it generate w/o a nonce, used for validating responses
var obj = '{}';
var sig = signonce.sign(obj);

// example 2: sign from an obj
var obj = {};
var sig = signonce.sign(obj, nonce);

// example 2.5: let it generate w/o a nonce, used for validating responses
var obj = {};
var sig = signonce.sign(obj);

// example 3: sign from a whole request (probably for checking)
var obj = {
    data: '{}',
    auth: {
        session: null,
        appID: 11,
        skuID: 35,
        device: 'vrej'
    },
    sig: 'dc1027f28bc1ba12f6ef770588cdd1f4',
    nonce: '6129188331007147111'
};
var sig = signonce.sign(obj); // undefined nonce = use object's nonce

// example 4: same as example 3 but for some reason u put in a nonce
var obj = {
    data: '{}',
    auth: {
        session: null,
        appID: 11,
        skuID: 35,
        device: 'vrej'
    },
    sig: 'dc1027f28bc1ba12f6ef770588cdd1f4',
    nonce: '6129188331007147111'
};
var nonce = obj.nonce;
var sig = signonce.sign(obj, nonce); // undefined nonce = use object's nonce
```

# FYI

`./nk-server-code` contains NK's **actual server code** (not all of them, and not in correct folders)
