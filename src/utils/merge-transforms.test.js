/* eslint-env mocha */
/* globals describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import merge from './merge-transforms';

// TODO: refactor this code

describe('merge transforms', () => {
  it('smoke tests', () => {
    expect(() => {
      const transforms = merge({
        preTransforms: [],
        postTransforms: [],
        transforms: {
          pre: [],
          post: [],
        },
      }, {
        type: {
          transformators: {
            pre: [],
            post: [],
          },
        },
      });

      expect(transforms).to.deep.equal({
        pre: [],
        post: [],
      });
    }).to.not.throw();
  });

  it('smoke tests 2', () => {
    expect(() => {
      const transforms = merge({
        transforms: {
          pre: null,
          post: null,
        },
      }, {
        type: {
          transformators: {
            pre: [],
            post: [],
          },
        },
      });

      expect(transforms).to.deep.equal({
        pre: [],
        post: [],
      });
    }).to.not.throw();
  });

  it('smoke tests 3', () => {
    expect(() => {
      const transforms = merge({ }, {
        type: {
          transformators: {
            pre: [],
            post: [],
          },
        },
      });

      expect(transforms).to.deep.equal({
        pre: [],
        post: [],
      });
    }).to.not.throw();
  });
});
