const getLayerByParam = (key, value, list) => {
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i].get(key) === value) {
      return list[i];
    }
  }
  return false;
};

export const getSingleFeature = (feature) => {
  if (!feature) { return feature; }
  let features = feature.get('features');
  return features ? features[0] : feature;
};

export const getLayerById = (value, list) => {
  return getLayerByParam('id', value, list);
};
