import NumberType from './number';

const { round, abs } = Math;

class IntType extends NumberType {
  constructor({ min, max } = {}) {
    super({ min, max });

    this.validators.push(val => (abs(val) - round(abs(val))) === 0);
  }
}

module.exports = IntType;
