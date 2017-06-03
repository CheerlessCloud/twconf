# twconf
NodeJS module for validation config from environment variables

[![Greenkeeper badge](https://badges.greenkeeper.io/TeslaCtroitel/twconf.svg)](https://greenkeeper.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/TeslaCtroitel/twconf.svg?branch=master)](https://travis-ci.org/TeslaCtroitel/twconf)
[![dependencies Status](https://david-dm.org/TeslaCtroitel/twconf/status.svg)](https://david-dm.org/TeslaCtroitel/twconf)
[![devDependencies Status](https://david-dm.org/TeslaCtroitel/twconf/dev-status.svg)](https://david-dm.org/TeslaCtroitel/twconf?type=dev)

**Attention: this is very early version. Don't use it in production.**

```javascript
import TwConf from 'twconf';

const conf = new TwConf({
  'database.mongodb.hostname': {
    comment: 'hostname of mongodb',
    simple: 'mongodb://localhost/test',
    type: new StringType({ allowed: [ /mongodb\:/ ] }),
    required: true,
    preTransforms: [
      // Yes, it's a pointless example.
      value => String(value),
    ],
    validators: [
      value => value !== 'localhost',
    ],
  },
});

conf.get('database.mongodb.hostname');
```
