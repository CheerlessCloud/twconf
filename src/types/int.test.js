/* eslint no-unused-expressions: "off" */
/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import IntType from './int';
import BaseType from './base';

describe('float type', () => {
  it('check base type', () => {
    expect(new IntType())
      .to.be.an.instanceof(BaseType, 'All types must extend base type');
  });

  it('invalid number with a fractional part', () => {
    const type = new IntType();

    expect(type.validators[3](282.33)).to.be.false;
    expect(type.validators[3](282)).to.be.true;
  });
});
