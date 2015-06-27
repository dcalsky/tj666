var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';


var FindclassStore = Reflux.createStore({
    listenables: [Actions],
    department:[
        {value:'材料化学研究所',label:'材料化学研究所'},
        {value:'测绘与地理信息学院',label:'测绘与地理信息学院'},
        {value:'城市规划系',label:'城市规划系'},
        {value:'城市轨道与铁道工程系',label:'城市轨道与铁道工程系'},
        {value:'道路与机场工程系',label:'道路与机场工程系'},
        {value:'德语系',label:'德语系'},
        {value:'地下建筑与工程系',label:'地下建筑与工程系'},
        {value:'电力牵引控制研究所',label:'电力牵引控制研究所'},
        {value:'电气工程系',label:'电气工程系'},
        {value:'电子科学与技术系',label:'电子科学与技术系'},
        {value:'动车技术与装备研究所',label:'动车技术与装备研究所'},
        {value:'法学院',label:'法学院'},
        {value:'分子与细胞生物系',label:'分子与细胞生物系'},
        {value:'高分子材料研究所',label:'高分子材料研究所'},
        {value:'工商管理系',label:'工商管理系'},
        {value:'工业工程教研室',label:'工业工程教研室'},
        {value:'公共管理系',label:'公共管理系'},
        {value:'公共英语教学部',label:'公共英语教学部'},
        {value:'管理科学与工程系',label:'管理科学与工程系'},
        {value:'国际与公共事务研究院',label:'国际与公共事务研究院'},
        {value:'国际政治系',label:'国际政治系'},
        {value:'海洋与地球科学学院',label:'海洋与地球科学学院'},
        {value:'航空航天与力学学院',label:'航空航天与力学学院'},
        {value:'化学系',label:'化学系'},
        {value:'环境工程系',label:'环境工程系'},
        {value:'环境科学系',label:'环境科学系'},
        {value:'会计系',label:'会计系'},
        {value:'基础医学院',label:'基础医学院'},
        {value:'计算机科学与工程系',label:'计算机科学与工程系'},
        {value:'建设管理与房地产系',label:'建设管理与房地产系'},
        {value:'建筑工程系',label:'建筑工程系'},
        {value:'建筑系',label:'建筑系'},
        {value:'交通工程系',label:'交通工程系'},
        {value:'交通信息工程系',label:'交通信息工程系'},
        {value:'教育技术与计算中心',label:'教育技术与计算中心'},
        {value:'经济与金融系',label:'经济与金融系'},
        {value:'景观学系',label:'景观学系'},
        {value:'控制科学与工程系',label:'控制科学与工程系'},
        {value:'口腔医学院',label:'口腔医学院'},
        {value:'历史学系',label:'历史学系'},
        {value:'临床医学',label:'临床医学'},
        {value:'留德预备部',label:'留德预备部'},
        {value:'轮轨关系研究所',label:'轮轨关系研究所'},
        {value:'马克思主义学院',label:'马克思主义学院'},
        {value:'汽车学院',label:'汽车学院'},
        {value:'桥梁工程系',label:'桥梁工程系'},
        {value:'日语系',label:'日语系'},
        {value:'软件学院',label:'软件学院'},
        {value:'设计与艺术学院',label:'设计与艺术学院'},
        {value:'社会学系',label:'社会学系'},
        {value:'生物信息学系',label:'生物信息学系'},
        {value:'生物医药与技术系',label:'生物医药与技术系'},
        {value:'市政工程系',label:'市政工程系'},
        {value:'数学系',label:'数学系'},
        {value:'水利工程系',label:'水利工程系'},
        {value:'文化产业系',label:'文化产业系'},
        {value:'物理科学与工程学院',label:'物理科学与工程学院'},
        {value:'信息与通信工程系',label:'信息与通信工程系'},
        {value:'英语系',label:'英语系'},
        {value:'预防医学院',label:'预防医学院'},
        {value:'运输管理工程系',label:'运输管理工程系'},
        {value:'哲学系',label:'哲学系'},
        {value:'政治学与行政学系',label:'政治学与行政学系'},
        {value:'中德学院',label:'中德学院'},
        {value:'中国语言文学系',label:'中国语言文学系'},
        {value:'专业基础教学部',label:'专业基础教学部'},
    ],
    classmateInfo:[],
    getInitialState:function(){
        return {
            department: this.department,
            findFinished: false ,
            classmateInfo : [],
        };
    },
    init: function() {
        
    }, 
    findClassmate:function(department){
        var self = this ;
        reqwest({
            url:URL_CROSS,
            type:'json',
            method:'get',
            data:{action:'findClassmate',department:department},
            success:function(resp){
                var iInfo ={};
                if(resp.status){
                    self.classmateInfo=[];
                    resp.classmateInfo.map(function(person){
                        for(attr in person){
                            if(!isNaN(attr)) continue;
                            iInfo[attr] = person[attr];
                        }
                        self.classmateInfo.push(iInfo);
                        iInfo={};
                    });
                    self.trigger({"department":self.department,"classmateInfo":self.classmateInfo,"findFinished":true});
                }else{
                    self.trigger({"department":self.department,"classmateInfo":self.classmateInfo,"findFinished":"error"});
                }
            },
            error:function(err){
                alert("请确保网络连接正常！");
            },
        })
    },
});

module.exports = FindclassStore ;
