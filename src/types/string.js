import ConfigFieldBaseType from './base';

class StringType extends ConfigFieldBaseType {
  /**
   * String type
   * @param  {number=} maxLength
   * @param  {number=} minLength
   * @param  {string[]=} allowed
   */
  constructor(maxLength, minLength, allowed) {
    super();

    this.validators.push(val => typeof val === 'string');

    if (minLength !== null && minLength !== undefined) {
      this.validators.push(val => val.length >= minLength);
    }

    if (maxLength !== null && maxLength !== undefined) {
      this.validators.push(val => val.length <= maxLength);
    }

    if (allowed && allowed.length) {
      this.validators.push(val => allowed.includes(val));
    }
  }
}

export default StringType;
module.exports = StringType;
