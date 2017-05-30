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
// eslint-disable-next-line no-new
      const conf = new TwConf({
        'database.mongodb.hostname': {
          comment: 'hostname of mongodb',
          simple: 'ams3.digitalocean.com',
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
});
