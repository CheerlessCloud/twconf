# twconf
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![codestyle](https://img.shields.io/badge/codestyle-airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Travis](https://img.shields.io/travis/CheerlessCloud/twconf.svg?style=flat-square)](https://travis-ci.org/TeslaCtroitel/twconf)
[![dependencies Status](https://david-dm.org/CheerlessCloud/twconf/status.svg?style=flat-square)](https://david-dm.org/TeslaCtroitel/twconf)
[![devDependencies Status](https://david-dm.org/CheerlessCloud/twconf/dev-status.svg?style=flat-square)](https://david-dm.org/TeslaCtroitel/twconf?type=dev)
[![Coverage Status](https://img.shields.io/coveralls/CheerlessCloud/twconf.svg?style=flat-square)](https://coveralls.io/github/TeslaCtroitel/twconf)

**Attention: this is beta version. Use it in production with caution.**

NodeJS module for strictly configuration from environment variables.

```javascript
import TwConf from 'twconf';

const conf = new TwConf({
  'database.mongodb.uri': {
    comment: 'MongoDB connection URI',
    simple: 'mongodb://localhost/test1',
    type: new TwConf.Types.StringType({ allowed: [ /mongodb\:/ ] }),
    required: true,
    preTransforms: [ /* function(value: string).<any> */ ],
    postTransforms: [ /* function(value: any).<any> */ ],
    validators: [
      value => value !== 'mongodb://localhost/test',
    ],
  },
});

conf.get('database.mongodb.hostname'); // get config value
conf.toString(); // get JSON version of config
```
#### String-defined type
``` javascript
new TwConf({
  nodeEnv: {
    type: 'string',
    allowed: ['development', 'test', 'production'],
    default: 'development',
  },
});
```

#### Object-defined type
``` javascript
new TwConf({
  nodeEnv: {
    type: {
      name: 'string',
      allowed: ['development', 'test', 'production'],
    },
    default: 'development',
  },
});
```

#### Available types:
- **Boolean**
  - no options
- **Float**
  - *min*: *number* - minimal value for field
  - *max*: *number* - maximum value for field
  - *precision*: *number* - count of number after dot
- **Int**
  - *min*: *number* - minimal value for field
  - *max*: *number* - maximum value for field
- **IpAddress**
  - *version*: *number (4|6)* - IP address standard version
- **Number**
  - *min*: *number* - minimal value for field
  - *max*: *number* - maximum value for field
- **String**
  - *minLength*: *number* - mininal length of string
  - *maxLength*: *number* - maximum length of string
  - *allowed*: *Array.<(string|RegExp)>* - allowed values of this field

#### Roadmap
- [x] Add a typification by string
- [x] Add a typification by object with options and name
- [ ] Increase the percentage of code coverage
- [ ] Fix incorrect throwing invalid values
- [ ] Add typescript definitions
- [ ] Migrate tests to Ava
