/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import BooleanType from './boolean';
import BaseType from './base';

describe('boolean type', () => {
  it('check base type', () => {
    expect(new BooleanType())
      .to.be.an.instanceof(BaseType, 'All types must extend base type');
  });

  it('check validators', () => {
    const booleanType = new BooleanType();

    booleanType.validators.map(fn => expect(fn(true)).to.be.true);
    booleanType.validators.map(fn => expect(fn(false)).to.be.true);
    booleanType.validators.map(fn => expect(fn('true')).to.be.true);
    booleanType.validators.map(fn => expect(fn('TRUE')).to.be.true);
    booleanType.validators.map(fn => expect(fn('1')).to.be.true);
    booleanType.validators.map(fn => expect(fn('false')).to.be.true);
    booleanType.validators.map(fn => expect(fn('FALSE')).to.be.true);
    booleanType.validators.map(fn => expect(fn('0')).to.be.true);

    booleanType.validators.map(fn => expect(fn('t')).to.be.false);
    booleanType.validators.map(fn => expect(fn('fls')).to.be.false);
  });

  it('check transformators', () => {
    const booleanType = new BooleanType();

    booleanType.transformators.post.map(fn => expect(fn('true')).to.be.true);
    booleanType.transformators.post.map(fn => expect(fn('TRUE')).to.be.true);
    booleanType.transformators.post.map(fn => expect(fn('1')).to.be.true);
    booleanType.transformators.post.map(fn => expect(fn('false')).to.be.false);
    booleanType.transformators.post.map(fn => expect(fn('FALSE')).to.be.false);
    booleanType.transformators.post.map(fn => expect(fn('0')).to.be.false);

    booleanType.transformators.post.map(fn => expect(fn(true)).to.be.true);
    booleanType.transformators.post.map(fn => expect(fn(1)).to.be.true);
    booleanType.transformators.post.map(fn => expect(fn(false)).to.be.false);
    booleanType.transformators.post.map(fn => expect(fn(0)).to.be.false);
    booleanType.transformators.post.map(fn => expect(fn({})).to.be.false);
  });
});
