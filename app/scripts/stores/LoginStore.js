var Reflux = require('reflux');
var Storage = require('react-storage');
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
                  if(!isNaN(attr)) continue;
                  userMessage[attr] = resp.userMessage[attr];
                };
                Actions.syncUserMessage(userMessage);
                Storage.set("user",JSON.stringify(userMessage));
                window.location.href = '#';     
               }else{
                alert("账号密码错误。");
               }
               self.trigger({'objLogin':self.objLogin});

          }
          , error: function(err){
               self.objLogin.status = 'error';
               self.trigger({'objLogin':self.objLogin});
               alert("请确保网络正常连接");
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
                  Storage.set("user",JSON.stringify(userMessage));
                  window.location.href = '#';
               }else{
                alert("未知错误，请重试！");
               }
               self.trigger({'objLogin':self.objLogin});

          }
          , error: function(err){
               self.objLogin.status = 'error';
               self.trigger({'objLogin':self.objLogin});
               alert("请确保网络正常连接");
          },
        });
    },
});

module.exports = LoginStore;
