/**
 * @typedef {object} ConfigFieldBaseType
 */
class ConfigFieldBaseType {
  /**
   * Array of validators for this type
   * @type {function.<boolean>[]}
   */
  validators = [];
}

export default ConfigFieldBaseType;
module.exports = ConfigFieldBaseType;
