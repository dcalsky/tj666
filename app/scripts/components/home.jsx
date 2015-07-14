var React = require('react');
var Reflux = require('reflux');
var Stroage = require('react-storage');

var Bs = require('react-bootstrap');
var Button = Bs.Button,  Carousel = Bs.Carousel ,CarouselItem = Bs.CarouselItem , Row = Bs.Row ,Col = Bs.Col;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var InfoItem = require('./InfoItem.jsx');
var Navbar = require('./Navbar.jsx');
var Header = require('./Header.jsx') , Footer = require('./Footer.jsx');

var Home = React.createClass({
    InfoData:[
        {
            key:"item1",
            InfoTitle:"找到新同学",
            InfoMessage:"作为新生的你，还没开学就想找到未来的同班同学吗？这不是幻想，大家的联系方式这里都有！",
            color:"#fc615c",
            Link:"#/classmate",
            buttonTitle:"进入",
        },
        {
            key:"item2",
            InfoTitle:"同济订奶",
            InfoMessage:"每天早上为您准备了新鲜的牛奶和早点，准时送到寝室门口！",
            color:"#fdbd40",
            Link:"milk.html",
            buttonTitle:"进入",
        },
        {
            key:"item3",
            InfoTitle:"选课必知",
            InfoMessage:"学长学姐已经被天天点名的老师折磨得不成人样,选不点名、100%拿优的课,来瞧瞧！",
            color:"#54c9ff",
            Link:"#/xuanke",
            disabled:true,
            buttonTitle:"即将推出",

        },
        {
            key:"item4",
            InfoTitle:"新生必备",
            InfoMessage:"想知道来同济大学入学都应该带一些必备的物品吗?校园周边的小吃,各种信息,一网打尽！",
            color:"#34c849",
            Link:"#/home",
            disabled:true,
            buttonTitle:"即将推出",
        },
    ],
    render: function() {
        return (
            <div>
              <Navbar />

              <Header color="blue" headerTitle="行动让改变发生" headerParagraph={<p>"Talk is cheap,Show me the code." <br/> {"Linus Torvalds"}</p>} subHeader={true} />
                <section>
                <div className="container text-center">
                  <Row>
                        {this.InfoData.map(function(data){
                            return (
                                <Col xs={12} sm={3} >
                                    <InfoItem key={data.key} InfoData={data} />
                                </Col> 
                                );
                        })}
                    </Row>
                  </div>
                </section>
                <Footer />
            </div>


        );
    }
});

module.exports = Home;
