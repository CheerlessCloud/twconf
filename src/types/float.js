import NumberType from './number';

const { abs } = Math;

class FloatType extends NumberType {
  constructor({ min, max, precision = -1 } = {}) {
    super({ min, max });

    this.validators.push((val) => {
      if (precision < 0) {
        return true;
      }

      const afterDot = String(abs(val)).split('.')[1].length;

      return afterDot >= precision;
    });
  }
}

module.exports = FloatType;
