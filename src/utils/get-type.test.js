/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import getType from './get-type';
import * as Types from './../types/';

describe('to map converter', () => {
  it('get type by name in "config.type"', () => {
    const type = getType({ type: 'string' });
    expect(type).to.be.instanceof(Types.ConfigFieldBaseType);
  });

  it('get type when in "config.type" instanceof BaseType', () => {
    expect(
      getType({
        type: new Types.StringType(),
      }),
    ).to.be.instanceof(Types.ConfigFieldBaseType);
  });

  it('get type by name from "config.type" object', () => {
    const type = getType({
      type: {
        name: 'number',
        min: 3,
      },
    });

    expect(type).to.be.instanceof(Types.ConfigFieldBaseType);
    expect(type.applyValidators(3)).to.be.equal(true);
    expect(type.applyValidators(2)).to.be.equal(false);
  });

  it('throw exception on get type by name from "config.type" object', () => {
    expect(() => getType({
      type: {
        name: 'unknownType',
      },
    })).to.be.throw('Unknown type');
  });

  it('throw exception on empty argument', () => {
    expect(() => getType()).to.throw('Type of field must be string, object or object extend from ConfigFieldBaseType');
  });

  it('throw exception on unknown type', () => {
    expect(() => getType({ type: 'unknown' })).to.throw('Unknown type');
  });
});
