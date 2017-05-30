import NumberType from './number';

const { abs } = Math;

class FloatType extends NumberType {
  constructor(min, max, precision) {
    super(min, max);

    this.validators.push((val) => {
      if (precision < 0) {
        return true;
      }

      const afterDot = String(abs(val)).split('.')[1];

      return !!(
        (afterDot && afterDot.length >= precision) ||
        (!afterDot && precision === 0)
      );
    });
  }
}

export default FloatType;
module.exports = FloatType;
