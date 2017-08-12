import BaseType from './base';

class NumberType extends BaseType {
  constructor({ min, max } = {}) {
    super();

    this.transformators.pre.push(val => Number(val));

    this.validators.push(val => !isNaN(val));

    this.validators.push(val =>
      ((typeof min === 'number') ? val >= min : true));

    this.validators.push(val =>
      ((typeof max === 'number') ? val <= max : true));
  }
}

module.exports = NumberType;
