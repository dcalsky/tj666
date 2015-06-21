var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'quit',
  'login',
  'register',
  'checkAccout',
  'getDepartment',
  'syncUserMessage',
  'setUserMessage',
]);

module.exports = Actions;