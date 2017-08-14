/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import envParser from './env-parser';

describe('env-parser', () => {
  it('return type', () => {
    expect(() => {
      const result = envParser({
        env: {
          'DATABASE.MONGODB_HOST': 'localhost',
          'DATABASE.MONGODB.PORT': '27316',
          'REDIS:HASH-ALGO': 'testName',
        },
      });

      expect(result).to.be.an.instanceof(Map, 'Return value must be a Map');
    }).not.to.throw();
  });

  it('keys format', () => {
    expect(() => {
      envParser({
        env: {
          'DATABASE.MONGODB_HOST': 'localhost',
          'DATABASE.MONGODB.PORT': '27316',
          'REDIS:HASH-ALGO': 'testName',
        },
      }).forEach((value, key) => {
        expect(key).to.match(/^[A-Za-z\d.]+$/);
      });
    }).not.to.throw();
  });

  it('try parse on process.env', () => {
    expect(() => envParser()).to.not.throw();
  });

  it('replace ":" symbol with "."', () => {
    const params = {
      env: {
        'REDIS:HASH-ALGO': 'testName',
      },
    };

    expect(() => {
      expect(envParser(params).has('redis.hashAlgo')).to.be.equal(true);
    }).not.to.throw();
  });

  it('flat keys', () => {
    const params = {
      flatOnly: true,
      env: {
        DATABASE_MONGODB_HOST: 'localhost',
        'REDIS-HASH-ALGO': 'testName',
      },
    };

    expect(() => {
      envParser(params).forEach((value, key) => {
        expect(key).to.match(/^[A-Za-z\d.]+$/);
      });
    }).not.to.throw();
  });

  it('flat keys - try invalid key', () => {
    const params = {
      flatOnly: true,
      env: {
        'REDIS:HASH-ALGO': 'testName',
      },
    };

    expect(() => envParser(params)).to.throw(Error, /Unsupported env field/);
  });

  it('flat keys - try on process.env', () => {
    expect(() => envParser({ flatOnly: true })).to.not.throw();
  });
});
