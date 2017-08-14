function mergeTransforms(config, configField) {
  const transforms = {
    pre: [...configField.type.transformators.pre],
    post: [...configField.type.transformators.post],
  };

  if (config.transforms) {
    if (config.transforms.pre instanceof Array) {
      transforms.pre.push(...config.transforms.pre);
    }

    if (config.transforms.post instanceof Array) {
      transforms.post.push(...config.transforms.post);
    }
  }

  if (config.preTransforms instanceof Array) {
    transforms.pre.push(...config.preTransforms);
  }

  if (config.postTransforms instanceof Array) {
    transforms.pre.push(...config.postTransforms);
  }

  return transforms;
}

export default mergeTransforms;
