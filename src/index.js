import EError from 'eerror';
import * as Types from './types';
import ConfigField from './config-field';
import envParser from './env-parser';
import toMap from './utils/to-map';

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
   * @function get
   * @public
   * @param {string} key - Key in config.
   * @returns {*} - Value of key.
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
   * @param {(Map.<string, ConfigField>|Array.<string, ConfigField>[]|object)} skeleton - Map of rules for validation config.
   * @param {object=} options - Options for twconf object.
   * @param {boolean} [options.flatOnly=false] - Allow only flat keys (this throw error on "foo.bar" key).
   * @param {boolean} [options.validationOnDemand=false] - Validate on demand (it's use for testing).
   */
  constructor(skeleton, {
    flatOnly = false,
    validationOnDemand = false,
  } = {}) {
    this.options = {};
    this.options.flatOnly = flatOnly;
    this.options.validationOnDemand = validationOnDemand;

    /**
     * @type {Map.<string, ConfigField>}
     */
    this.skeleton = toMap(skeleton);

    this.skeleton.forEach((value, key) => {
      if (!(value instanceof ConfigField)) {
        if (typeof value !== 'object') {
          throw new EError('Config rule must be an object', {
            field: key,
          });
        }

        this.skeleton.set(key, new ConfigField(value));
      }
    });

    if (!this.options.validationOnDemand) {
      this.validate();
    }
  }

  /**
   * @function validate
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
      throw new EError('Validation errors', { errors });
    }
  }
}

module.exports = TwConf;
