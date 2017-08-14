/* eslint no-new: "off", no-unused-expressions: "off" */
/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import TwConf from './index';
import { StringType } from './types';

const options = {
  env: {
    'DATABASE.MONGODB.HOSTNAME': 'localhost',
    'DATABASE.MONGODB.PORT': '27316',
    'REDIS:HASH-ALGO': 'testName',
  },
};

describe('twconfig main tests', () => {
  it('simple smoke test', () => {
    expect(() => {
      const conf = new TwConf({
        'database.mongodb.hostname': {
          comment: 'hostname of mongodb',
          sample: 'ams3.digitalocean.com',
          type: new StringType(),
          preTransforms: [
            value => String(value),
          ],
          validators: [
            value => value !== 'mongodb',
          ],
          default: 'localhost',
        },
      }, options);

      expect(conf.get('database.mongodb.hostname')).to.be.equal('localhost');
    }).not.to.throw();
  });

  it('throw error on invalid config rule type', () => {
    expect(() => {
      new TwConf({ 'database.mongodb.hostname': 'invalid value' });
    }).to.be.throws('Config rule must be an object');
  });


  it('splitter', () => {
    expect(() => {
      const conf = new TwConf({
        nodeEnv: {
          comment: 'env mode',
          type: new StringType({ allowed: ['development', 'test', 'production'] }),
          default: 'development',
          splitter: val => ({
            envType: val,
            isDevelopment: val === 'development',
            isTesting: val === 'test',
            isProduction: val === 'production',
          }),
        },
      }, {
        env: {
          NODE_ENV: 'production',
        },
      });

      expect(conf.get('envType')).to.be.equal('production');
      expect(conf.get('isDevelopment')).to.be.equal(false);
      expect(conf.get('isTesting')).to.be.equal(false);
      expect(conf.get('isProduction')).to.be.equal(true);
    }).not.to.throw();
  });

  it('string defined type - all ok', () => {
    expect(() => {
      const conf = new TwConf({
        nodeEnv: {
          type: 'string',
          allowed: ['development', 'test', 'production'],
          default: 'development',
        },
      }, {
        env: {
          NODE_ENV: 'production',
        },
      });

      expect(conf.get('nodeEnv')).to.be.equal('production');
    }).not.to.throw();
  });

  it('string defined type - invalid value', () => {
    expect(() =>
      new TwConf({
        nodeEnv: {
          type: 'string',
          allowed: ['development', 'test', 'production'],
          default: 'development',
        },
      }, {
        env: {
          NODE_ENV: 'unknown',
        },
      }),
    ).to.throws(Error);
  });

  it('get flatObject', () => {
    const config = new TwConf({
      nodeEnv: {
        type: 'string',
        allowed: ['development', 'test', 'production'],
        default: 'development',
      },
    }, {
      env: {
        NODE_ENV: 'test',
      },
    });

    expect(config.flatObject).to.be.frozen;
    expect(config.flatObject.nodeEnv).to.be.equal('test');
  });

  it('validate on demand option', () => {
    const config = new TwConf({
      nodeEnv: {
        type: 'string',
        allowed: ['development', 'test', 'production'],
        default: 'development',
      },
    }, {
      validateOnDemand: true,
      env: {
        NODE_ENV: 'test',
      },
    });

    expect(config.env.size).to.be.equal(0);
    expect(config.config.size).to.be.equal(0);
  });

  it('toString method', () => {
    const config = new TwConf({
      nodeEnv: {
        type: 'string',
        allowed: ['development', 'test', 'production'],
        default: 'development',
      },
    }, {
      env: {
        NODE_ENV: 'test',
      },
    });

    expect(typeof config.toString).to.be.equal('function');
    expect(() => config.toString()).to.not.throw();
    expect(config.toString(false)).to.be.equal('{"nodeEnv":"test"}');
    expect(config.toString()).to.be.equal('{\n  "nodeEnv": "test"\n}');
  });
});
