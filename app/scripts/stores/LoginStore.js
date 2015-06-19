var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL = '../php/Login.php';
var LoginStore = Reflux.createStore({
    listenables: [Actions],
    objLogin:{
        handleLogin:function(data,isLogin){
            this.handleLogin(data,isLogin);
        },
        isLogin:true,
    },
    getInitialState:function(){
        return {
            objLogin:this.objLogin,
        }
    },
    init: function() {
    },
    handleLogin:function(data,isLogin){
        console.log(data + '--' + isLogin);
    },
    checkAccout:function(accout){
        this.objLogin.isLogin = false;
        reqwest({
            url: URL
          , method: 'get'
          , data: {action:'checkAccout',accout:accout}
          , type: 'json'
          , success: function (resp) {
              console.log(resp.status);
            }
        });
        /*
        request.post(URL, {
          data: {action:'checkAccout',accout:accout},
          type: 'form',
          success: function (res) {
            console.log(res);
            if (res.status == true) {
              if (res.msg)
                console.log(res.msg);
            } else {
              console.log('失败的连接');
            }
          },
          failure: function () {
            console.log('失败的连接')
          }.bind(this)
        });
        */
        this.trigger(this.objLogin);
    }
});

module.exports = LoginStore;
