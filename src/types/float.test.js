/* eslint no-unused-expressions: "off" */
/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import FloatType from './float';
import BaseType from './base';

describe('float type', () => {
  it('check base type', () => {
    expect(new FloatType())
      .to.be.an.instanceof(BaseType, 'All types must extend base type');
  });

  it('precision validator', () => {
    const type = new FloatType({ precision: 3 });

    expect(type.validators[3](282.33)).to.be.false;
    expect(type.validators[3](282.333)).to.be.true;
    expect(type.validators[3](282.333333)).to.be.true;
  });

  it('precision validator with negative precision', () => {
    const type = new FloatType({ precision: -3 });

    expect(type.validators[3](282)).to.be.true;
    expect(type.validators[3](282.33)).to.be.true;
    expect(type.validators[3](282.333)).to.be.true;
  });
});
