import ConfigFieldBaseType from './base';

class StringType extends ConfigFieldBaseType {
  /**
   * String type
   * @param {object=} options
   * @param {number=} options.maxLength
   * @param {number=} options.minLength
   * @param {(string|RegExp)[]=} options.allowed
   */
  constructor(options = {}) {
    super();

    this.validators.push(val => typeof val === 'string');

    if (options.minLength !== null && options.minLength !== undefined) {
      this.validators.push(val => val.length >= options.minLength);
    }

    if (options.maxLength !== null && options.maxLength !== undefined) {
      this.validators.push(val => val.length <= options.maxLength);
    }

    if (options.allowed && options.allowed.length) {
      /**
       * @type {string[]}
       */
      this.allowedStrings = [];

      /**
       * @type {RegExp[]}
       */
      this.allowedRegExp = [];

// eslint-disable-next-line no-restricted-syntax
      for (const allowed of options.allowed) {
        if (allowed instanceof RegExp) {
          this.allowedRegExp.push(allowed);
        } else if (typeof allowed === 'string') {
          this.allowedStrings.push(allowed);
        }
      }

      this.validators.push(val => this.allowedStrings.includes(val));
      this.validators.push(val => this.allowedRegExp.some(regexp => !!val.match(regexp)));
    }
  }
}

export default StringType;
module.exports = StringType;
