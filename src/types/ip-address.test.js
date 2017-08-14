/* eslint no-unused-expressions: "off" */
/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import IpAddressType from './ip-address';
import BaseType from './base';

describe('number type', () => {
  it('check base type', () => {
    expect(new IpAddressType())
      .to.be.an.instanceof(BaseType, 'All types must extend base type');
  });

  it('is valid ip', () => {
    const type = new IpAddressType();

    expect(type.validators[0]('127.0.0.1')).to.be.true;
    expect(type.validators[0]('127.0.0.1invalid')).to.be.false;
  });

  it('is IPv4', () => {
    const type = new IpAddressType({ version: 4 });

    expect(type.validators[0]('127.0.0.1')).to.be.true;
    expect(type.validators[0]('2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d')).to.be.false;
  });

  it('is IPv6', () => {
    const type = new IpAddressType({ version: 6 });

    expect(type.validators[0]('2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d')).to.be.true;
    expect(type.validators[0]('127.0.0.1')).to.be.false;
  });
});
