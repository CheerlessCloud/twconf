/**
 * Created by enroute on 30.05.17.
 */
import ConfigFieldBaseType from './base';

class BooleanType extends ConfigFieldBaseType {
  constructor() {
    super();

    this.validators.push((val) => {
      if (typeof val === 'boolean') {
        return true;
      }

      return typeof val === 'string' &&
        ['true', 'false', '1', '0'].includes(val.toLowerCase());
    });

    this.transformators.post.push(val => ['true', '1'].includes(val.toLowerCase()));
  }
}

module.exports = BooleanType;
