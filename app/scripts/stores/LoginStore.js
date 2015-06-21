var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var UserStore = require('./UserStore.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';

var LoginStore = Reflux.createStore({
    mixins:[Reflux.connect(UserStore,'UserStore')],
    listenables: [Actions],
    objLogin:{
        hadLogin:false,
        isLogin:true,
        status:'',
    },
    getInitialState:function(){
        return {
          objLogin:this.objLogin
        };
    },
    init: function() {
    },
    checkAccout:function(accout){
        var self = this;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'get'
          , data:{action:'checkAccout',accout:accout}
          , success: function (resp) {
               self.objLogin.isLogin = resp.status;
               self.trigger({'objLogin':self.objLogin});
            }
        });
    },
    login:function(data){
      this.objLogin.status = '';
      this.trigger({'objLogin':this.objLogin});
      var self = this;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'post'
          , data:{action:'login',accout:data.accout,password:data.password}
          , success: function (resp) {
               self.objLogin.hadLogin = resp.status;
               self.objLogin.status = self.objLogin.hadLogin ? 'success' : 'error';
               if(self.objLogin.status == 'success'){
                  var userMessage={accout:data.accout,password:data.password,QQ:resp.QQ,department:resp.department};
                  Actions.setUserMessage(userMessage);
               }
               self.trigger({'objLogin':self.objLogin});
               window.location.href = '#';
          }
          , error: function(err){
               self.objLogin.hadLogin = resp.status;
               self.objLogin.status = 'error';
               self.trigger({'objLogin':self.objLogin});
          },
        });
    },
    register:function(data){
      this.objLogin.status = '';
      this.trigger({'objLogin':this.objLogin});
      var self = this;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'post'
          , data:{action:'register',accout:data.accout,password:data.password}
          , success: function (resp) {
               self.objLogin.hadLogin = resp.status;
               self.objLogin.status = self.objLogin.hadLogin ? 'success' : 'error';
               if(self.objLogin.status == 'success'){
                  var userMessage={accout:data.accout,password:data.password,QQ:'',department:''};
                  Actions.setUserMessage(userMessage);
               }
               self.trigger({'objLogin':self.objLogin});
               window.location.href = '#';
          }
          , error: function(err){
               self.objLogin.hadLogin = resp.status;
               self.objLogin.status = 'error';
               self.trigger({'objLogin':self.objLogin});
          },
        });
    },
});

module.exports = LoginStore;
