module.exports.security = {
  cors: {
    allRoutes: true,
    allowOrigins: ['http://0.0.0.0:4200','http://0.0.0.0:4201'],
    allowCredentials: true,
  },
  csrf: false,
};
