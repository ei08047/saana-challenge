module.exports.policies = {
  UsersController: {
    '*':'isAuthenticated',
    logout: 'isAuthenticated',
    login: true,
    signup: true
  },
  DummyController: {
    getData:'isAuthenticated'
  }
};
