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
  });

  it('check max validator', () => {
    const stringType = new StringType(6);

    expect(stringType.validators).to.be.have.length(2);
    expect(stringType.validators[1]('string')).to.be.equal(true);
    expect(stringType.validators[1]('big string')).to.be.equal(false);
  });

  it('check max and min validator', () => {
    const stringType = new StringType(10, 2);

    expect(stringType.validators).to.be.have.length(3);
    expect(stringType.validators[1]('normal')).to.be.equal(true);
    expect(stringType.validators[1]('l')).to.be.equal(false);
    expect(stringType.validators[2]('string')).to.be.equal(true);
    expect(stringType.validators[2]('very big string')).to.be.equal(false);
  });

  it('check allowed list validator', () => {
    const stringType = new StringType(null, null, ['allow1', 'allow2']);

    expect(stringType.validators).to.be.have.length(2);
    expect(stringType.validators[1]('allow1')).to.be.equal(true);
    expect(stringType.validators[1]('allow2')).to.be.equal(true);
    expect(stringType.validators[1]('disallow string')).to.be.equal(false);
  });
});
