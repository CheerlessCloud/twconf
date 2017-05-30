import { ConfigFieldBaseType as BaseType } from './types';

/**
 * @public
 * @class
 */
class ConfigField {
  /**
   * @param {object} config
   * @param {string} config.name - name of this field
   * @param {string} config.comment - comment for this field
   * @param {string} config.sample - sample of value
   * @param {ConfigFieldBaseType} config.type - type of value
   * @param {(boolean|function.<boolean>)=} config.required
   * [if default is undefined, by default this field set to 'true']
   * @param {functions[]} config.preTransforms
   * [array of transformation for value, apply before validation]
   * @param {{ pre: function[], post: function[] }} config.transforms [transforms for value]
   * @param {functions[]} config.postTransforms
   * [array of transformation for value, apply after validation]
   * @param {functions.<boolean>[]} config.validators [array of validators for value]
   * @param {*} config.default [default value for this field]
   */
  constructor(config) {
    /**
     * @type {string}
     */
    this.comment = config.comment || '';
    /**
     * @type {string}
     */
    this.sample = config.sample || config.default || '';

    /**
     * @type {*}
     */
    this.default = config.default;

    // if 'default' value is undefined, by default this rule required flag set to true
    /**
     * @type {boolean}
     */
    this.required = ((this.default === null || this.default === undefined) &&
    (config.required === null || config.required === undefined || config.required === true));

    if (!(config.type instanceof BaseType)) {
      throw new Error('Type of field must be object extend from base ConfigFieldType');
    }
    /**
     * @type {ConfigFieldBaseType}
     */
    this.type = config.type;

    /**
     * @type {{ pre: function[], post: function[] }}
     */
    this.transformators = {
      pre: [...this.type.transformators.pre],
      post: [...this.type.transformators.post],
    };

    if (config.transforms) {
      if (config.transforms.pre && config.transforms.pre instanceof Array) {
        this.transformators.pre.push(...config.transforms.pre);
      }
      if (config.transforms.post && config.transforms.post instanceof Array) {
        this.transformators.post.push(...config.transforms.post);
      }
    }

    if (config.preTransforms && config.preTransforms instanceof Array) {
      this.transformators.pre.push(...config.preTransforms);
    }

    if (config.postTransforms && config.postTransforms instanceof Array) {
      this.transformators.pre.push(...config.postTransforms);
    }

    /**
     * @type {function.<boolean>[]}
     */
    this.validators = [...this.type.validators, ...(config.validators || [])];
  }

  /**
   * @method validate
   * @param {*=} value
   * @return {*}
   */
  validate(value) {
    let newValue;

    if ((value === undefined || value === null)) {
      if (this.required) {
        throw new Error('This field is required');
      }

      newValue = this.default;
    }

    if (!(value === undefined || value === null)) {
      try {
        newValue = this.applyPreTransforms(value);
      } catch (err) {
        const newError = new Error('Can\'t apply pre-transform to value');
        newError.error = err;
        throw newError;
      }
    }

    try {
      if (!this.applyValidators(newValue)) {
        throw new Error();
      }
    } catch (err) {
      const newError = new Error('Validation error');
      newError.error = err;
      throw newError;
    }

    try {
      newValue = this.applyPostTransforms(newValue);
    } catch (err) {
      const newError = new Error('Can\'t apply post-transforms to value');
      newError.error = err;
      throw newError;
    }

    return newValue;
  }

  /**
   * @method applyPreTransforms
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
}

export default ConfigField;
module.exports = ConfigField;
