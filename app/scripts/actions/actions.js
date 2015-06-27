var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'quit',
  'login',
  'register',
  'checkAccout',
  'getDepartment',
  'setUserMessage',
  'syncUserMessage',
  'findClassmate',
]);

module.exports = Actions;