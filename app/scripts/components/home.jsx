var React = require('react');
var Reflux = require('reflux');

var Stroage = require('react-storage');

var Bs = require('react-bootstrap');
var Button = Bs.Button,  Carousel = Bs.Carousel ,CarouselItem = Bs.CarouselItem , Row = Bs.Row ,Col = Bs.Col;

var Router = require('react-router');

var InfoItem = require('./InfoItem.jsx');
var Navbar = require('./Navbar.jsx');
var Header = require('./Header.jsx') , Footer = require('./Footer.jsx');

var Home = React.createClass({
    InfoData:[
        {
            key:"item1",
            InfoTitle:"找到新同学",
            InfoMessage:"作为新生的你，还没开学就想找到未来的同班同学吗？<br />现在这已不是幻想，小伙伴们的联系方式这里都有！",
            color:"#fc615c",
            Link:"#/classmate",
            buttonTitle:"进入",
        },
        {
            key:"item2",
            InfoTitle:"同济订奶",
            InfoMessage:"每天早上为您准备了新鲜的牛奶和早点<br /> 7点之前准时送到寝室门口！",
            color:"#fdbd40",
            Link:"milk.html",
            buttonTitle:"进入",
        },
        {
            key:"item3",
            InfoTitle:"心愿墙",
            InfoMessage:"还在等每年只有一次的女生节么？<br />还在抱怨男生不可以写心愿卡么？<br />想找人一起刷屠苏馆？<br />想找人一起粗去约浪？<br />❤没错，全部满足你！",
            color:"#54c9ff",
            Link:"#/wall",
            buttonTitle:"进入",

        },
        {
            key:"item4",
            InfoTitle:"选课网",
            InfoMessage:"学长学姐还在苦于选到了格外严厉的老师,格外吃力不讨好的课程<br />避免重蹈覆辙走他们的老路? <br />选课网,一键帮你提供选课咨询！",
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
                <Footer name={"周左左"} />
            </div>


        );
    }
});

module.exports = Home;
