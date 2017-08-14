/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import TwConf from './index';
import { StringType } from './types';

describe('twconfig main tests', () => {
  beforeEach(() => {
    process.env = {
      'DATABASE.MONGODB.HOSTNAME': 'localhost',
      'DATABASE.MONGODB.PORT': '27316',
      'REDIS:HASH-ALGO': 'testName',
    };
  });

  it('simple smoke test', () => {
    expect(() => {
      const conf = new TwConf({
        'database.mongodb.hostname': {
          comment: 'hostname of mongodb',
          sample: 'ams3.digitalocean.com',
          type: new StringType(),
          // required: true,
          preTransforms: [
            value => String(value),
          ],
          validators: [
            value => value !== 'mongodb',
          ],
          default: 'localhost',
        },
      });

      expect(conf.get('database.mongodb.hostname')).to.be.equal('localhost');
    }).not.to.throw();
  });

  it('throw error on invalid config rule type', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new TwConf({ 'database.mongodb.hostname': 'invalid value' });
    }).to.be.throws('Config rule must be an object');
  });


  it('splitter', () => {
    process.env = {
      NODE_ENV: 'production',
    };

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
      });

      expect(conf.get('envType')).to.be.equal(process.env.NODE_ENV);
      expect(conf.get('isDevelopment')).to.be.equal(false);
      expect(conf.get('isTesting')).to.be.equal(false);
      expect(conf.get('isProduction')).to.be.equal(true);
    }).not.to.throw();
  });

  it('string defined type', () => {
    process.env = {
      NODE_ENV: 'production',
    };

    expect(() => {
      // eslint-disable-next-line no-new
      const conf = new TwConf({
        nodeEnv: {
          comment: 'env mode',
          type: 'string',
          allowed: ['development', 'test', 'production'],
          default: 'development',
          splitter: val => ({
            envType: val,
            isDevelopment: val === 'development',
            isTesting: val === 'test',
            isProduction: val === 'production',
          }),
        },
      });

      expect(conf.get('envType')).to.be.equal(process.env.NODE_ENV);
      expect(conf.get('isDevelopment')).to.be.equal(false);
      expect(conf.get('isTesting')).to.be.equal(false);
      expect(conf.get('isProduction')).to.be.equal(true);
    }).not.to.throw();
  });
});
