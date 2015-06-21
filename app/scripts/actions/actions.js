var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'quit',
  'login',
  'register',
  'checkAccout',
  'getDepartment',
  'setUserMessage',
]);

module.exports = Actions;