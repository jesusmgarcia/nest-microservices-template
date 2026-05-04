module.exports = (options) => ({
  ...options,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 300,
  },
});
