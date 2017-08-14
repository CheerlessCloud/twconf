import * as Types from './types';
import ConfigField from './config-field';
import envParser from './env-parser';

class TwConf {
  static Types = Types;

  /**
   * @type {Map.<string, *>}
   */
  config = new Map();

  /**
   * @type {Map.<string, string>}
   */
  env = new Map();

  /**
   * @method get
   * @public
   * @param {string} key
   * @return {*}
   */
  get(key) {
    return this.config.get(key);
  }

  get flatObject() {
    const result = {};

    this.config.forEach((value, key) => {
      result[key.replace(/([._-])([a-z\d])/g, str => str[1].toUpperCase())] = value;
    });

    return Object.freeze(result);
  }

  toString() {
    return JSON.stringify(this.config);
  }

  /**
   * Create TwConf object
   * @param {(Map.<string, ConfigField>|Array.<string, ConfigField>[]|object)} confSkeleton
   * @param {object=} options
   * @param {boolean} [options.allowUnspecified=true]
   * @param {boolean} [options.flatOnly=false]
   * @param {boolean} [options.validationOnDemand=false]
   */
  constructor(confSkeleton, {
    allowUnspecified = true,
    flatOnly = false,
    validationOnDemand = false,
  } = {}) {
    this.options = {};
    this.options.allowUnspecified = allowUnspecified;
    this.options.flatOnly = flatOnly;
    this.options.validationOnDemand = validationOnDemand;

    /**
     * @type {Map.<string, ConfigField>}
     */
    this.skeleton = null;

    if (confSkeleton instanceof Map) {
      this.skeleton = confSkeleton;
    }

    if (confSkeleton instanceof Array) {
      this.skeleton = new Map(confSkeleton);
    }

    if (typeof confSkeleton === 'object') {
      this.skeleton = new Map(Object.keys(confSkeleton).map(key => [key, confSkeleton[key]]));
    }

    this.skeleton.forEach((value, key) => {
      if (!(value instanceof ConfigField)) {
        if (typeof value !== 'object') {
          const err = new TypeError('Value of ConfigRule must be a object');
          err.field = key;
          throw err;
        }

        this.skeleton.set(key, new ConfigField(value));
      }
    });

    if (!this.options.validationOnDemand) {
      this.validate();
    }
  }

  /**
   * @method validate
   * @public
   */
  validate() {
    this.env = envParser(this.options);

    const errors = [];

    this.skeleton.forEach((configField, key) => {
      try {
        const validatedValue = configField.validate(this.env.get(key));
        configField.splitter(validatedValue, key, this.env)
          .forEach((newValue, newKey) => this.config.set(newKey, newValue));
      } catch (err) {
        err.field = key;
        errors.push(err);
      }
    });

    if (errors.length) {
      const newError = new Error('Validation errors');
      newError.errors = errors;
      throw newError;
    }
  }
}

module.exports = TwConf;
