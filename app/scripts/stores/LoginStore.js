var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';

var LoginStore = Reflux.createStore({
    listenables: [Actions],
    objLogin:{
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
               self.objLogin.status = resp.status ? 'success' : 'error';
               if(self.objLogin.status == 'success'){
                  var userMessage={accout:data.accout,password:data.password};
                  for (attr in resp.userMessage){
                    switch (attr){
                      case 'us_accout' : attr = 'accout' 
                      break;
                      case 'us_password' : attr = 'password' 
                      break;
                      case 'us_QQ' : attr = 'QQ' 
                      break;
                      case 'us_department' : attr = 'department'
                      break;
                      case 'us_tel' : attr = 'tel' 
                      break;
                      case 'us_name' : attr = 'name' 
                      break;
                    };
                    userMessage[attr] = resp.userMessage['us_' + attr];
                  };
                  Actions.syncUserMessage(userMessage);
                  window.location.href = '#';     
               }
               self.trigger({'objLogin':self.objLogin});

          }
          , error: function(err){
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
               self.objLogin.status = resp.status ? 'success' : 'error';
               if(self.objLogin.status == 'success'){
                  var userMessage={accout:data.accout,password:data.password};
                  Actions.syncUserMessage(userMessage);
                  window.location.href = '#';
                  self.trigger({'objLogin':self.objLogin});
               }
               self.trigger({'objLogin':self.objLogin});

          }
          , error: function(err){
               self.objLogin.status = 'error';
               self.trigger({'objLogin':self.objLogin});
          },
        });
    },
});

module.exports = LoginStore;
