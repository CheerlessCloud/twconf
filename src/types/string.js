import TwConfFieldType from './base';

export default class String extends TwConfFieldType {
  /**
   * String type
   * @param  {number=} minLength
   * @param  {number=} maxLength
   * @param  {string[]=} allowed
   */
  constructor(minLength, maxLength, allowed) {
    super();

    this.validators.push(val => typeof val === 'string');

    if (minLength !== null && minLength !== undefined) {
      this.validators.push(val => val.length > minLength);
    }

    if (maxLength !== null && maxLength !== undefined) {
      this.validators.push(val => val.length < maxLength);
    }

    if (allowed && allowed.length) {
      this.validators.push(val => allowed.includes(val));
    }
  }
}
