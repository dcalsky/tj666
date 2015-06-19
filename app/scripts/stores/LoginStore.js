var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var request = require('../src/js/utils/request.js');
var URL = 'http://www.ttjj666.com/php/milk.php?action=milkclass';
function _connectDatabase(URL,data){

};
var LoginStore = Reflux.createStore({
    listenables: [Actions],
    data:{},
    init: function() {
        
    },
    login: function(data,isLogin) {
        this.data = data;
        this.data.isLogin = true;
        console.log(this.data);
        this.trigger(this.data);
    },
    register:function(data){
        this.data = data;
        this.data.isLogin = false;
        this.trigger(this.data);
    },
    confirmAccout:function(accout){

    },
});

module.exports = LoginStore;
