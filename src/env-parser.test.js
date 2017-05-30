/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import envParser from './env-parser';

describe('env-parser', () => {
  beforeEach(() => {
    process.env = {
      'DATABASE.MONGODB_HOST': 'localhost',
      'DATABASE.MONGODB.PORT': '27316',
      'REDIS:HASH-ALGO': 'testName',
    };
  });

  it('return type', () => {
    expect(() => {
      const result = envParser();

      expect(result).to.be.an.instanceof(Map, 'Return value must be a Map');
    }).not.to.throw();
  });

  it('keys format', () => {
    expect(() => {
      envParser().forEach((value, key) => {
        expect(key).to.match(/^[A-Za-z\d.]+$/);
      });
    }).not.to.throw();
  });

  it('replace ":" symbol with "."', () => {
    process.env = {
      'REDIS:HASH-ALGO': 'testName',
    };

    expect(() => {
      expect(envParser().has('redis.hashAlgo')).to.be.equal(true);
    }).not.to.throw();
  });

  it('flat keys', () => {
    process.env = {
      DATABASE_MONGODB_HOST: 'localhost',
      'REDIS-HASH-ALGO': 'testName',
    };

    expect(() => {
      envParser({ flatOnly: true }).forEach((value, key) => {
        expect(key).to.match(/^[A-Za-z\d.]+$/);
      });
    }).not.to.throw();
  });

  it('flat keys - try invalid key', () => {
    process.env = {
      'REDIS:HASH-ALGO': 'testName',
    };

    expect(() => {
      envParser({ flatOnly: true });
    }).to.throw(Error, /Unsupported env field name/);
  });
});
