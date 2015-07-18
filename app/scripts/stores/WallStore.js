var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';


var XuankeStore = Reflux.createStore({
    listenables: [Actions],
    objWish:{
    	wishs: [],
    	page: 1,
      loading: false,
      addCompleted: false,
    },
    getInitialState:function(){
        return {
            objWish: this.objWish,
        };
    },
    init: function() {
        
    }, 
    refreshWish: function(){
	    var self = this;
      this.objWish.loading = true ;
      self.trigger({'objWish': self.objWish});
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'get'
        , data:{action: 'refreshWish',page: 1}
        , success: function (resp) {
             if(resp.status){
             	self.objWish.wishs = resp.wishs;
              self.objWish.page = 1 ;
              self.objWish.loading = false ;
            	self.trigger({'objWish': self.objWish});
       		  }else{
              if(!resp.wishs.length){
                self.objWish.loading = true ;
                self.trigger({'objWish': self.objWish});
              }
            }
          }
        , error: function(err){
          self.objWish.loading = false ;
          alert("请确保网络连接正常！");
          self.trigger({'objWish': self.objWish});
        }
      });
    },
    loadWish: function(){
      var self = this;
      this.objWish.loading = true ;
      self.trigger({'objWish': self.objWish});
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'get'
        , data:{action: 'loadWish',page: self.objWish.page}
        , success: function (resp) {
             if(resp.status){
                self.objWish.wishs = self.objWish.wishs.concat(resp.wishs);
                self.objWish.page = self.objWish.page + 1 ;
                self.objWish.loading = false ;
                self.trigger({'objWish': self.objWish});
            }else{
              if(!resp.wishs.length){
                self.objWish.loading = true ;
                self.trigger({'objWish': self.objWish});
              }
            }
          }
        , error: function(err){
          self.objWish.loading = false ;
          alert("请确保网络连接正常！");
          self.trigger({'objWish': self.objWish});
        }
      });
    },
    //标题，内容，手机号(选)，微信(选)，QQ(选)，时间(自动生成)，学号(自动生成)
    addWish: function(wish){
	    var self = this;
	    self.addCompleted = false ;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'post'
          , data:{action: 'addWish',content: wish.content,title: wish.title,QQ: wish.QQ,gender: wish.gender,accout: wish.accout,time: new Date()}
          , success: function (resp) {
               if(resp.status){
               	self.objWish.addCompleted = true ;
              	self.trigger({'objWish': self.objWish});
               }
            }
          , error: function(err){
            self.objWish.addCompleted = true ;
            alert("请确保网络连接正常！");
            self.trigger({'objWish': self.objWish});
          }
        });
    },
    viewMyWish: function(accout){
      var self = this;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'get'
          , data:{action: 'viewMyWish',accout: accout}
          , success: function (resp) {
               if(resp.status){
                self.objWish.wishs = resp.wishs ;
                self.trigger({'objWish': self.objWish});
               }
            }
          , error: function(err){
            alert("请确保网络连接正常！");
          }
        });
    },
});

module.exports = XuankeStore ;
