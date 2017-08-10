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

module.exports = ConfigFieldBaseType;
