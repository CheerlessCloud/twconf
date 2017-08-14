import { isIP } from 'net';
import BaseType from './base';

/**
 * @class IPAddressType
 * @extends {BaseType}
 */
class IPAddressType extends BaseType {
  constructor({ version } = {}) {
    super();

    this.validators.push((val) => {
      if (version) {
        return isIP(String(val)) === version;
      }

      return !!isIP(String(val));
    });
  }
}

module.exports = IPAddressType;
