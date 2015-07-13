var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';


var XuankeStore = Reflux.createStore({
    listenables: [Actions],


    getInitialState:function(){
        return {
            
        };
    },
    init: function() {
        
    }, 
    
});

module.exports = XuankeStore ;
