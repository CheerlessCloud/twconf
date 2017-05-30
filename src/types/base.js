/**
 * @typedef {object} ConfigFieldBaseType
 */
class ConfigFieldBaseType {
  /**
   * Array of validators for this type
   * @type {function.<boolean>[]}
   */
  validators = [];

  /**
   * @type {{pre: function[], post: function[]}}
   */
  transformators = {
    pre: [],
    post: [],
  };
}

export default ConfigFieldBaseType;
module.exports = ConfigFieldBaseType;
