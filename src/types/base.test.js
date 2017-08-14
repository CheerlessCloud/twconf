/* eslint no-unused-expressions: "off" */
/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import BaseType from './base';

describe('boolean type', () => {
  it('check base type validation and transformation', () => {
    const type = new BaseType();

    type.validators.push(val => !!(val + 3));
    expect(type.applyValidators(-3)).to.be.equal(false);
    expect(type.applyValidators(0)).to.be.equal(true);

    type.transformators.pre.push(val => parseInt(val, 10));
    expect(type.applyPreTransforms('12a')).to.be.equal(12);
    expect(type.applyPreTransforms('a12ffa')).to.be.NaN;

    type.transformators.post.push(val => val - 2);
    expect(type.applyPostTransforms(12)).to.be.equal(10);
    expect(type.applyPreTransforms('a12ffa')).to.be.NaN;

    expect(type.handle('10af')).to.be.deep.equal({
      isValid: true,
      value: 8,
    });
  });
});
