var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var Storage = require('react-storage');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';
var _ = require('underscore');

var WallStore = Reflux.createStore({
    listenables: [Actions],
    objWish:{
    	wishs: [],
    	page: 0,
      loading: false,
      addCompleted: false,
      single: {},
      lastTime: null,
    },
    clear:function(){
      this.objWish.loading = true ;
      this.objWish.addCompleted = false ;
      this.objWish.wishs = [];
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
      this.clear()
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
                    item['liked'] = true ;
                  }
                if(_where(resp.drawed,{wish_id:item.id}).length){
                    item['drawCompleted'] = true ;
                  }
              });
            	self.trigger({'objWish': self.objWish});
         		  }else{
                if(resp.wishs.length < 1){
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
    drawWish: function(id,accout){
      var self = this;
      reqwest({
          url: URL_CROSS
        , type: 'json'
        , method: 'post'
        , data:{action: 'drawWish',id: id,accout: accout}
        , success: function (resp) {
             if(resp.status){
              var _wish = _.where(self.objWish.wishs,{id:id})[0] ;
              _wish['drawCompleted'] = true ;
              self.trigger({'objWish': self.objWish});
            }else{
              var _wish = _.where(self.objWish.wishs,{id:id})[0] ;
              _wish['drawCompleted'] = false ;
              self.trigger({'objWish': self.objWish});
            }
          }
        , error: function(err){
          var _wish = _.where(self.objWish.wishs,{id:id})[0] ;
          _wish['drawCompleted'] = false ;
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
                      item['liked'] = true ;
                    }
                  if(_where(resp.drawed,{wish_id:item.id}).length){
                      item['drawCompleted'] = true ;
                  }
                });
                self.trigger({'objWish': self.objWish});
                }else{
                  if(resp.wishs.length < 1){
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
      var thisTime = D.getTime();
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
              thisTime: thisTime,
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
    checkLastTime: function(accout){
      var self = this ;
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'get'
          , data:{
              action: 'checkLastTime',
              accout: accout,
            }
          , success: function (resp) {
               if(resp.status){
                self.objWish.lastTime = resp.lastTime ;
                self.trigger({'objWish': self.objWish});
               }
            }
          , error: function(err){
            self.objWish.lastTime = NaN ;
            self.trigger({'objWish': self.objWish});
          }
        });
    },
    viewMyWish: function(accout){
      var self = this ;
        this.clear()
        self.trigger({'objWish': self.objWish});
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'get'
          , data:{action: 'viewMyWish',accout: accout}
          , success: function (resp) {
               if(resp.status){
                self.objWish.wishs = resp.wishs ;
                self.objWish.addCompleted = true ;
                self.objWish.loading = false ;
                self.objWish.wishs.map(function(item){
                  item['mine'] = true ;
                });
                self.trigger({'objWish': self.objWish});
               }
            }
          , error: function(err){
            alert("请确保网络连接正常！");
          }
        });
    },
    viewDrawWish: function(accout){
      var self = this ;
        this.clear()
        self.trigger({'objWish': self.objWish});
        reqwest({
            url: URL_CROSS
          , type: 'json'
          , method: 'get'
          , data:{action: 'viewDrawWish',accout: accout}
          , success: function (resp) {
               if(resp.status){
                self.objWish.wishs = resp.wishs ;
                self.objWish.addCompleted = true ;
                self.objWish.loading = false ;
                self.objWish.wishs.map(function(item){
                  item['mine'] = true ;
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
                for(attr in resp.wish){
                    if(!isNaN(attr)) continue;
                    objWish.single[attr] = resp.wish[attr];
                }
                self.objWish.single['liked'] = _.where(slef.objWish.wishs,{wish_id: id})[0]['liked'];
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

module.exports = WallStore ;
