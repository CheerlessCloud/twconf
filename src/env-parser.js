const normalFieldName = /^[A-Z\d_\-.:]+$/i;
const flatOnlyFieldName = /^[A-Z\d_-]+$/i;

/**
 * @param {object=} options
 * @param {boolean=} [options.flatOnly=false]
 * @return {Map.<string, string>}
 */
function envParse(options = {}) {
  const flatOnly = options.flatOnly || false;

  const { env } = global.process;

  return new Map(Object.keys(env)
    .map((key) => {
      if (!key.match(flatOnly ? flatOnlyFieldName : normalFieldName)) {
        throw Error(`Unsupported env field name: ${key}`);
      }

      const newKey = key.toLowerCase()
        .replace(/:/g, '.')
        .replace(/([_-])([a-z\d])/g, str => str[1].toUpperCase());

      return [newKey, env[key]];
    }));
}

export default envParse;
