var Reflux = require('reflux');
var Actions = require('../actions/actions.js');

var UserStore = Reflux.createStore({
	listenables:[Actions],
    user:{
      accout:'',
      password:'',
      QQ:'',
      department:'',
    },
    getInitialState:function(){
    	return {
    		user:this.user,
    	}
    },
    init:function(){
    	this.getUserMessage();
    },
    getUserMessage:function(){
    	this.trigger({'user':this.user});
    },
    setUserMessage:function(message){
    	for (attr in message){
    		this.user[attr] = message[attr] ;
    	};
    	this.trigger({'user':this.user})
    },
    quit:function(){
    	for (attr in this.user){
    		this.user[attr] = '' ;
    	};
    	this.trigger({'user':this.user})
    },
});

module.exports = UserStore ; 