import TwConfFieldType from './base';

export default class Number extends TwConfFieldType {
  constructor(min, max) {
    super();

    this.validators.push(val => typeof val === 'number');

    if (min !== null && min !== undefined) {
      this.validators.push(val => val > min);
    }

    if (max !== null && max !== undefined) {
      this.validators.push(val => val < max);
    }
  }
}
