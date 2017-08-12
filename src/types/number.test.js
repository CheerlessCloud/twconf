/* eslint no-unused-expressions: "off" */
/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import NumberType from './number';
import BaseType from './base';

describe('number type', () => {
  it('check base type', () => {
    expect(new NumberType())
      .to.be.an.instanceof(BaseType, 'All types must extend base type');
  });

  it('base validators', () => {
    const type = new NumberType();

    expect(type.validators).to.be.have.length(3);
    expect(type.validators[0](NaN)).to.be.false;
    expect(type.validators[0](282)).to.be.true;
  });

  it('min validator', () => {
    const type = new NumberType({ min: 5 });

    expect(type.validators[1](10)).to.be.true;
    expect(type.validators[1](5)).to.be.true;
    expect(type.validators[1](4)).to.be.false;
  });

  it('max validator', () => {
    const type = new NumberType({ max: 5 });

    expect(type.validators[2](4)).to.be.true;
    expect(type.validators[2](5)).to.be.true;
    expect(type.validators[2](6)).to.be.false;
  });
});
