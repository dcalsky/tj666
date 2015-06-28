var Reflux = require('reflux');
var Storage = require('react-storage');

var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';


var UserStore = Reflux.createStore({
	listenables:[Actions],
    user:{
      accout:'',
      password:'',
      name:'',
      QQ:'',
      department:'',
      tel:'',
      messageHadSet:false,
      hadLogin:false,
    },
    getInitialState:function(){

      if(Storage.has("user") && Storage.get("user")){        
        var storage_user = JSON.parse(Storage.get("user"));
        this.user.hadLogin = true ;
        for (attr in storage_user){
          this.user[attr] = storage_user[attr];
        }
        if(this.user.name && this.user.QQ && this.user.department){
          this.user.messageHadSet = true ;
        }
      }
        return {
          user:this.user
        }
    },

    init:function(){
    	this.trigger({'user':this.user});
    },
    syncUserMessage:function(message){
    	for (attr in message){
    		this.user[attr] = message[attr] ;
    	};
        this.user.hadLogin = true ;
        this.user.messageHadSet = (this.user.name && this.user.department && this.user.QQ) ? true : false ;
    	this.trigger({'user':this.user});
    },
    setUserMessage:function(message){
        for (attr in message){
            this.user[attr] = message[attr] ;
        };
        var self = this;
        console.log(this.user);
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'post'
          , data:{action:'setUserMessage',message:self.user}
          , success: function (resp) {
               if(resp.status){
                    self.user.messageHadSet = true ;
                    Storage.set("user",JSON.stringify(self.user));
                    self.trigger({'user':self.user});
               }
          }
          , error: function(err){
                alert('设置失败,请在保证网络流畅的情况下重试.');
          },
        });
    },
    quit:function(){
    	for (attr in this.user){
    		this.user[attr] = false ;
    	};
      this.user.messageHadSet = false ;
      this.user.hadLogin = false ;
      Storage.clear();
      Storage.set("user",null);
    	this.trigger({'user':this.user})
    },
});

module.exports = UserStore ; 