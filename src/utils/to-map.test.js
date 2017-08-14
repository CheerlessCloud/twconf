/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import toMap from './to-map';

describe('to map converter', () => {
  it('return instance of Map from object', () => {
    const res = toMap({ key1: 'val1' });
    expect(res).to.be.an.instanceof(Map, 'Return value must be a Map');
    expect(res.get('key1')).to.be.equals('val1');
    expect(res.size).to.be.equals(1);
  });

  it('return instance of Map from array of arrays', () => {
    const res = toMap([['key1', 'val1']]);
    expect(res).to.be.an.instanceof(Map, 'Return value must be a Map');
    expect(res.get('key1')).to.be.equals('val1');
    expect(res.size).to.be.equals(1);
  });

  it('return instance of Map from other Map', () => {
    const res = toMap(new Map([['key1', 'val1']]));
    expect(res).to.be.an.instanceof(Map, 'Return value must be a Map');
    expect(res.get('key1')).to.be.equals('val1');
    expect(res.size).to.be.equals(1);
  });
});
