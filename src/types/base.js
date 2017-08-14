/**
 * @class ConfigFieldBaseType
 */
class ConfigFieldBaseType {
  /**
   * Array of validators for this type
   * @type {function.<boolean>[]}
   */
  validators = [];

  /**
   * @type {{ pre: function[], post: function[] }}
   */
  transformators = {
    pre: [],
    post: [],
  };

  /**
   * @param {*} value
   * @return {*}
   */
  applyPreTransforms(value) {
    return this.transformators.pre.reduce((val, fn) => fn(val), value);
  }

  /**
   * @method applyValidators
   * @param {*} value
   * @return {boolean}
   */
  applyValidators(value) {
    return this.validators.every(fn => fn(value));
  }

  /**
   * @method applyPostTransforms
   * @param {*} value
   * @return {*}
   */
  applyPostTransforms(value) {
    return this.transformators.post.reduce((val, fn) => fn(val), value);
  }

  handle(value) {
    const tValue = this.applyPreTransforms(value);
    const isValid = this.applyValidators(tValue);
    return {
      isValid,
      value: this.applyPostTransforms(tValue),
    };
  }
}

module.exports = ConfigFieldBaseType;
