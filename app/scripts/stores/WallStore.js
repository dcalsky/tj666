var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';
var _ = require('underscore');

var XuankeStore = Reflux.createStore({
    listenables: [Actions],
    objWish:{
    	wishs: [],
    	page: 0,
      loading: false,
      addCompleted: false,
      single: {},
    },
    getInitialState:function(){
        return {
            objWish: this.objWish,
        };
    },
    init: function() {
        
    }, 
    refreshWish: function(accout){
	    var self = this;
      this.objWish.loading = true ;
      this.objWish.addCompleted = false ;
      self.trigger({'objWish': self.objWish});
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'get'
        , data:{action: 'loadWish',page: 0,accout: accout}
        , success: function (resp) {
             if(resp.status){
              self.objWish.wishs = [];
             	self.objWish.wishs = resp.wishs;
              self.objWish.page = 1 ;
              self.objWish.loading = false ;
              self.objWish.wishs.map(function(item){
              if(_.where(resp.liked,{wish_id:item.id}).length){
                  item.liked = true ;
                }
              });
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
    likeWish: function(id,accout){
      var self = this;
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'post'
        , data:{action: 'like',id: id,accout: accout}
        , success: function (resp) {
             if(resp.status){
              var _wish = _.where(self.objWish.wishs,{id:id})[0] ;
              _wish['likeCompleted'] = true ;
              _wish['unlikeCompleted'] = false ;
              _wish['liked'] = true ;
              _wish['love'] ++ ;
              self.trigger({'objWish': self.objWish});
            }else{
              self.trigger({'objWish': self.objWish});
            }
          }
        , error: function(err){
          alert("请确保网络连接正常！");
          self.trigger({'objWish': self.objWish});
        }
      });
    },
    unlikeWish: function(id,accout){
      var self = this;
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'post'
        , data:{action: 'unlike',id: id,accout: accout}
        , success: function (resp) {
             if(resp.status){
              var _wish = _.where(self.objWish.wishs,{id:id})[0] ;
              _wish['unlikeCompleted'] = true ;
              _wish['likeCompleted'] = false ;
              _wish['liked'] = false ;
              _wish['love'] -- ;
              self.trigger({'objWish': self.objWish});
            }else{
              self.trigger({'objWish': self.objWish});
            }
          }
        , error: function(err){
          alert("请确保网络连接正常！");
          self.trigger({'objWish': self.objWish});
        }
      });
    },
    loadWish: function(accout){
      var self = this;
      this.objWish.addCompleted = false ;
      this.objWish.loading = true ;
      self.trigger({'objWish': self.objWish});
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'get'
        , data:{action: 'loadWish',page: self.objWish.page,accout: accout}
        , success: function (resp) {
             if(resp.status){
                self.objWish.wishs = self.objWish.wishs.concat(resp.wishs);
                self.objWish.page = self.objWish.page + 1 ;
                self.objWish.loading = false ;
                self.objWish.wishs.map(function(item){
                if(_.where(resp.liked,{wish_id:item.id}).length){
                    item.liked = true ;
                  }
                });
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
    //标题，内容，手机号(选)，微信(选)，contact(选)，时间(自动生成)，学号(自动生成)
    addWish: function(wish){
	    var self = this;
      var D = new Date();
	    this.objWish.addCompleted = false ;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'post'
          , data:{
              action: 'addWish',
              content: wish.content,
              title: wish.title,
              contact: wish.contact,
              gender: wish.gender,
              accout: wish.accout,
              name: wish.name,
              time: D.toLocaleString(),
            }
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
                self.objWish.wishs = [];
                self.objWish.wishs = resp.wishs ;
                self.objWish.wishs.map(function(item){
                if(_.where(resp.liked,{wish_id:item.id}).length){
                    item['liked'] = true ;
                  }
                });
                self.trigger({'objWish': self.objWish});
               }
            }
          , error: function(err){
            alert("请确保网络连接正常！");
          }
        });
    },
    getSingleWish: function(id){
      var self = this;
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'get'
        , data:{action: 'getSingleWish',id: id}
        , success: function (resp) {
             if(resp.status){
                console.log(resp.wish);
                for(attr in resp.wish){
                    if(!isNaN(attr)) continue;
                    objWish.single[attr] = resp.wish[attr];
                }
                self.objWish.single['liked'] = _.where(slef.objWish.wishs,{wish_id: id})[0]['liked'];
                console.log(_.where(slef.objWish.wishs,{wish_id: id})[0]);
                self.trigger({'objWish': self.objWish});
                }else{
                  if(!resp.wishs.length){
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
});

module.exports = XuankeStore ;
