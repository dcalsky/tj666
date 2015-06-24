var Reflux = require('reflux');
var Actions = require('../actions/actions.js');
var reqwest = require('reqwest');
var URL_CROSS = 'http://www.ttjj666.com/php/Login.php';
var URL = '../php/Login.php';


var FindclassStore = Reflux.createStore({
    listenables: [Actions],
    department:[
        {'text':'材料化学研究所','value':'材料化学研究所'},
        {'text':'测绘与地理信息学院','value':'测绘与地理信息学院'},
        {'text':'城市规划系','value':'城市规划系'},
        {'text':'城市轨道与铁道工程系','value':'城市轨道与铁道工程系'},
        {'text':'道路与机场工程系','value':'道路与机场工程系'},
        {'text':'德语系','value':'德语系'},
        {'text':'地下建筑与工程系','value':'地下建筑与工程系'},
        {'text':'电力牵引控制研究所','value':'电力牵引控制研究所'},
        {'text':'电气工程系','value':'电气工程系'},
        {'text':'电子科学与技术系','value':'电子科学与技术系'},
        {'text':'动车技术与装备研究所','value':'动车技术与装备研究所'},
        {'text':'法学院','value':'法学院'},
        {'text':'分子与细胞生物系','value':'分子与细胞生物系'},
        {'text':'高分子材料研究所','value':'高分子材料研究所'},
        {'text':'工商管理系','value':'工商管理系'},
        {'text':'工业工程教研室','value':'工业工程教研室'},
        {'text':'公共管理系','value':'公共管理系'},
        {'text':'公共英语教学部','value':'公共英语教学部'},
        {'text':'管理科学与工程系','value':'管理科学与工程系'},
        {'text':'国际与公共事务研究院','value':'国际与公共事务研究院'},
        {'text':'国际政治系','value':'国际政治系'},
        {'text':'海洋与地球科学学院','value':'海洋与地球科学学院'},
        {'text':'航空航天与力学学院','value':'航空航天与力学学院'},
        {'text':'化学系','value':'化学系'},
        {'text':'环境材料研究所','value':'环境材料研究所'},
        {'text':'环境工程系','value':'环境工程系'},
        {'text':'环境科学系','value':'环境科学系'},
        {'text':'会计系','value':'会计系'},
        {'text':'机车车辆研究所','value':'机车车辆研究所'},
        {'text':'机械电子工程研究所','value':'机械电子工程研究所'},
        {'text':'机械设计与理论研究所','value':'机械设计与理论研究所'},
        {'text':'基础医学院','value':'基础医学院'},
        {'text':'计算机科学与工程系','value':'计算机科学与工程系'},
        {'text':'建设管理与房地产系','value':'建设管理与房地产系'},
        {'text':'建筑材料研究所','value':'建筑材料研究所'},
        {'text':'建筑工程系','value':'建筑工程系'},
        {'text':'建筑系','value':'建筑系'},
        {'text':'交通工程系','value':'交通工程系'},
        {'text':'交通信息工程系','value':'交通信息工程系'},
        {'text':'教育技术与计算中心','value':'教育技术与计算中心'},
        {'text':'结构工程与防灾研究所','value':'结构工程与防灾研究所'},
        {'text':'金属基材料研究所','value':'金属基材料研究所'},
        {'text':'经济与金融系','value':'经济与金融系'},
        {'text':'景观学系','value':'景观学系'},
        {'text':'控制科学与工程系','value':'控制科学与工程系'},
        {'text':'口腔医学院','value':'口腔医学院'},
        {'text':'历史学系','value':'历史学系'},
        {'text':'联邦德国研究所','value':'联邦德国研究所'},
        {'text':'临床医学','value':'临床医学'},
        {'text':'留德预备部','value':'留德预备部'},
        {'text':'轮轨关系研究所','value':'轮轨关系研究所'},
        {'text':'马克思主义学院','value':'马克思主义学院'},
        {'text':'暖通空调及燃气研究所','value':'暖通空调及燃气研究所'},
        {'text':'汽车学院','value':'汽车学院'},
        {'text':'桥梁工程系','value':'桥梁工程系'},
        {'text':'热能工程研究所','value':'热能工程研究所'},
        {'text':'日语系','value':'日语系'},
        {'text':'软件学院','value':'软件学院'},
        {'text':'设计与艺术学院','value':'设计与艺术学院'},
        {'text':'社会学系','value':'社会学系'},
        {'text':'生物信息学系','value':'生物信息学系'},
        {'text':'生物医药与技术系','value':'生物医药与技术系'},
        {'text':'市政工程系','value':'市政工程系'},
        {'text':'数学系','value':'数学系'},
        {'text':'水利工程系','value':'水利工程系'},
        {'text':'水泥基材料研究所','value':'水泥基材料研究所'},
        {'text':'文化产业系','value':'文化产业系'},
        {'text':'无机非金属材料研究所','value':'无机非金属材料研究所'},
        {'text':'物理科学与工程学院','value':'物理科学与工程学院'},
        {'text':'现代制造技术研究所','value':'现代制造技术研究所'},
        {'text':'信息与通信工程系','value':'信息与通信工程系'},
        {'text':'英语系','value':'英语系'},
        {'text':'预防医学院','value':'预防医学院'},
        {'text':'运输管理工程系','value':'运输管理工程系'},
        {'text':'哲学系','value':'哲学系'},
        {'text':'政治学与行政学系','value':'政治学与行政学系'},
        {'text':'制动技术研究所','value':'制动技术研究所'},
        {'text':'制冷与热工程研究所','value':'制冷与热工程研究所'},
        {'text':'中德学院','value':'中德学院'},
        {'text':'中国语言文学系','value':'中国语言文学系'},
        {'text':'专业基础教学部','value':'专业基础教学部'},
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
        console.log(department);
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
                }
            },
            error:function(err){
                alert("请确保网络连接正常！");
            },
        })
    },
});

module.exports = FindclassStore ;
