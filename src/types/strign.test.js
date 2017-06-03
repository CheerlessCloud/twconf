/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import StringType from './string';
import BaseType from './base';

describe('string type', () => {
  it('check base type', () => {
    expect(new StringType())
      .to.be.an.instanceof(BaseType, 'All types must extend base type');
  });

  it('check type validator', () => {
    const stringType = new StringType();

    stringType.validators.map(fn => expect(fn('some string')).to.be.true);
    stringType.validators.map(fn => expect(fn({})).to.be.false);
  });

  it('check max validator', () => {
    const stringType = new StringType({ maxLength: 6 });

    expect(stringType.validators).to.be.have.length(2);
    expect(stringType.validators[1]('string')).to.be.equal(true);
    expect(stringType.validators[1]('big string')).to.be.equal(false);
  });

  it('check max and min validator', () => {
    const stringType = new StringType({ maxLength: 10, minLength: 3 });

    expect(stringType.validators).to.be.have.length(3);
    expect(stringType.validators[1]('normal')).to.be.equal(true);
    expect(stringType.validators[1]('l')).to.be.equal(false);
    expect(stringType.validators[2]('string')).to.be.equal(true);
    expect(stringType.validators[2]('very big string')).to.be.equal(false);
  });

  it('check allowed string list validator', () => {
    const stringType = new StringType({ allowed: ['allow1', 'allow2'] });

    expect(stringType.validators).to.be.have.length(2);
    expect(stringType.validators[1]('allow1')).to.be.equal(true);
    expect(stringType.validators[1]('allow2')).to.be.equal(true);
    expect(stringType.validators[1]('disallow string')).to.be.equal(false);
  });

  it('check allowed regexp list validator', () => {
    const stringType = new StringType({ allowed: [/^[A-Z]+$/, /^\d+$/] });

    expect(stringType.validators).to.be.have.length(2);
    expect(stringType.validators[1]('deny value')).to.be.equal(false);
    expect(stringType.validators[1]('AZA')).to.be.equal(true);
    expect(stringType.validators[1]('125')).to.be.equal(true);
    expect(stringType.validators[1]('125abc')).to.be.equal(false);
  });

  it('check allowed regexp and string list validator', () => {
    const stringType = new StringType({ allowed: ['abc', /^[A-Z]+$/, /^\d+$/] });

    expect(stringType.validators).to.be.have.length(3);
    expect(stringType.validators[2]('deny value')).to.be.equal(false);
    expect(stringType.validators[2]('AZA')).to.be.equal(true);
    expect(stringType.validators[2]('125')).to.be.equal(true);
    expect(stringType.validators[2]('125abc')).to.be.equal(false);
    expect(stringType.validators[1]('abc')).to.be.equal(true);
  });
});
