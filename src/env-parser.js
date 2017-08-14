import EError from 'eerror';

const normalFieldName = /^[A-Z\d_\-.:]+$/i;
const flatOnlyFieldName = /^[A-Z\d_-]+$/i;

/**
 * @param {object=} options - Options of env parser.
 * @param {boolean=} [options.flatOnly=false] - Allow only flat keys (this throw error on "foo.bar" key).
 * @returns {Map.<string, string>} - Map of env variables.
 */
function envParse({ flatOnly = false, env = process.env } = {}) {
  return new Map(Object.entries(env)
    .map(([key, value]) => {
      if (!key.match(flatOnly ? flatOnlyFieldName : normalFieldName)) {
        throw new EError('Unsupported env field name', { name: key });
      }

      const newKey = key.toLowerCase()
        .replace(/:/g, '.')
        .replace(/([_-])([a-z\d])/g, str => str[1].toUpperCase());

      return [newKey, value];
    }));
}

export default envParse;
