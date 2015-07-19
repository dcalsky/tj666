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
  'addWish',
  'refreshWish',
  'loadWish',
  'getSingleWish',
  'viewMyWish',
  'likeWish',
  'unlikeWish',
]);

module.exports = Actions;