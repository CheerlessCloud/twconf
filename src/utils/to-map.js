/**
 * @typedef {(Map.<any, any>|Array.<any, any>[]|object)} toMapArg
 */

/**
 * @param {toMapArg} collection
 * @returns {Map.<any, any>}
 */
// eslint-disable-next-line consistent-return
function toMap(collection) {
  if (collection instanceof Map) {
    return collection;
  } else if (collection instanceof Array) {
    return new Map(collection);
  } else if (typeof collection === 'object') {
    return new Map(Object.entries(collection));
  }

  throw new Error('No collection');
}

export default toMap;
