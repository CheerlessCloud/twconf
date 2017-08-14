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

    expect(type.applyValidators(NaN)).to.be.false;
    expect(type.applyValidators(282)).to.be.true;
  });

  it('min validator', () => {
    const type = new NumberType({ min: 5 });

    expect(type.applyValidators(10)).to.be.true;
    expect(type.applyValidators(5)).to.be.true;
    expect(type.applyValidators(4)).to.be.false;
  });

  it('max validator', () => {
    const type = new NumberType({ max: 5 });

    expect(type.applyValidators(4)).to.be.true;
    expect(type.applyValidators(5)).to.be.true;
    expect(type.applyValidators(6)).to.be.false;
  });

  it('min and max validator', () => {
    const type = new NumberType({ min: 2, max: 5 });

    expect(type.applyValidators(2)).to.be.true;
    expect(type.applyValidators(5)).to.be.true;
    expect(type.applyValidators(4)).to.be.true;
    expect(type.applyValidators(1)).to.be.false;
    expect(type.applyValidators(6)).to.be.false;
  });
});
