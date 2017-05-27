import NumberType from './number';

const { abs } = Math;

export default class Float extends NumberType {
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
