import EError from 'eerror';
import getType from './utils/get-type';
import mergeTransforms from './utils//merge-transforms';

/**
 * @public
 * @class ConfigField
 */
class ConfigField {
  /**
   * @param {Object} config - ConfigField attributes.
   * @param {string} config.name - Name of this field.
   * @param {string} config.comment - Comment for this field.
   * @param {string} config.sample - Sample of value.
   * @param {ConfigFieldBaseType} config.type - Type of field.
   * @param {any} config.default - Default value for this field.
   * @param {boolean=} config.required - Is this field required. If "default" field is undefined, default value of "required" field will be 'true'.
   * @param {function(value:string).<any>[]} config.preTransforms - Array of transformation for value, apply before validation.
   * @param {{ pre: function(value:string).<any>[], post: function(value:string).<any>[] }} config.transforms - Transforms for value.
   * @param {function(value:string).<any>[]} config.postTransforms - Array of transformation for value, apply after validation.
   * @param {function(value: any).<boolean>[]} config.validators - Array of validators for value.
   * @param {function(value: any, key: string, env: Map.<string, string>).<(Map.<string, *>|{})>} config.splitter - Array of splitters functions.
   */
  constructor(config) {
    /**
     * @type {string}
     */
    this.name = config.name;
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

    // if 'default' value is undefined, by default required flag set to true
    /**
     * @type {boolean}
     */
    this.required = ((this.default === null || this.default === undefined) &&
    (config.required === null || config.required === undefined || config.required === true));

    /**
     * @type {ConfigFieldBaseType}
     */
    this.type = getType(config);

    /**
     * @type {{ pre: function[], post: function[] }}
     */
    this.transformators = mergeTransforms(config, this);

    /**
     * @type {function.<boolean>[]}
     */
    this.validators = [...this.type.validators, ...(config.validators || [])];

    /**
     * @type {function(value:*, key:string, env:Map.<string, string>).<(Map.<string, *>|{})>}
     */
    this.splitterFunction = config.splitter;
  }

  /**
   * @function validate
   * @param {any=} value - Value to validation and transformations.
   * @returns {any} - Value after transformations.
   */
  validate(value) {
    let newValue;

    if ((value === undefined || value === null)) {
      if (this.required) {
        throw new EError('This field is required', this);
      }

      newValue = this.default;
    }

    if (!(value === undefined || value === null)) {
      try {
        newValue = this.applyPreTransforms(value);
      } catch (err) {
        throw new EError('Can\'t apply pre-transform to value', this, { error: err });
      }
    }

    if (!this.applyValidators(newValue)) {
      throw new EError('Invalid value', this);
    }

    try {
      newValue = this.applyPostTransforms(newValue);
    } catch (err) {
      throw new EError('Can\'t apply post-transforms to value', this, { error: err });
    }

    return newValue;
  }

  /**
   * @function splitter
   * @param {*} value - Value of field.
   * @param {string} key - Name of field.
   * @param {Map.<string, string>} env - Map with environment variables.
   * @returns {Map.<string, *>} - Map of new values.
   */
  splitter(value, key, env) {
    if (!this.splitterFunction) {
      return new Map([[key, value]]);
    }

    const result = this.splitterFunction(value, key, env);

    if (result instanceof Map) {
      return result;
    }

    const validResult = (result instanceof Map || typeof result === 'object');
    if (!result || !validResult) {
      return new Map([[key, value]]);
    }

    return new Map(Object.entries(result));
  }

  /**
   * @function applyPreTransforms
   * @param {any} value - Value for transformation.
   * @returns {any} - Value after transformation.
   */
  applyPreTransforms(value) {
    return this.transformators.pre.reduce((val, fn) => fn(val), value);
  }

  /**
   * @function applyValidators
   * @param {any} value - Value for validation.
   * @returns {boolean} - Value after validation.
   */
  applyValidators(value) {
    return this.validators.every(fn => fn(value));
  }

  /**
   * @function applyPostTransforms
   * @param {any} value - Value for transformation.
   * @returns {any} - Value after transformation.
   */
  applyPostTransforms(value) {
    return this.transformators.post.reduce((val, fn) => fn(val), value);
  }
}

export default ConfigField;
