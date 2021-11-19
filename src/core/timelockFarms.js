const farms = {};

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
