import { isIP } from 'net';
import TwConfFieldType from './base';

export default class IPAddress extends TwConfFieldType {
  constructor(version) {
    super();

    this.validators.push((val) => {
      if (typeof val !== 'string') {
        return false;
      }

      if (version === 4) {
        return isIP(val) === 4;
      } else if (version === 6) {
        return isIP(val) === 6;
      }
      return !!isIP(val);
    });
  }
}
