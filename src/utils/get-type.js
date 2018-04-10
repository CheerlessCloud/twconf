import EError from 'eerror';
import Types from './../types';

const types = new Map(
  Object.entries(Types)
    .map(([name, value]) =>
      ([
        name.toLowerCase().replace(/type/ig, ''),
        value,
      ]),
    ),
);

function getType(config = {}) {
  if (config.type instanceof Types.ConfigFieldBaseType) {
    return config.type;
  } else if (typeof config.type === 'string') {
    const CurrentType = types.get(config.type);

    if (!CurrentType) {
      throw new EError('Unknown type').combine({ typeName: config.type });
    }

    return new CurrentType(config);
  } else if (typeof config.type === 'object') {
    const typename =
         config.type.name
      || config.type.type
      || config.type.timename
      || config.type.timeName;
    const CurrentType = types.get(typename.toLowerCase());

    if (!CurrentType) {
      throw new EError('Unknown type').combine({ typeName: typename });
    }

    return new CurrentType({ ...config, ...config.type });
  }

  throw new EError('Type of field must be string, object or object extend from ConfigFieldBaseType')
    .combine({ fieldName: config.name });
}

export default getType;
