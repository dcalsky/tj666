var React = require('react');
var Reflux = require('reflux');

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
            key:0,
            InfoTitle:"找到新同学",
            InfoMessage:"作为新生的你，还没开学就想找到未来的同班同学吗？这不是幻想，大家的联系方式这里都有！",
            color:"#fc615c",
            Link:"classmate",
        },
        {
            key:1,
            InfoTitle:"找到新同学",
            InfoMessage:"作为新生的你，还没开学就想找到未来的同班同学吗？这不是幻想，大家的联系方式这里都有！",
            color:"#fdbd40",
            Link:"classmate",
        },
        {
            key:3,
            InfoTitle:"找到新同学",
            InfoMessage:"作为新生的你，还没开学就想找到未来的同班同学吗？这不是幻想，大家的联系方式这里都有！",
            color:"#34c849",
            Link:"classmate",
        },
        {
            key:4,
            InfoTitle:"找到新同学",
            InfoMessage:"作为新生的你，还没开学就想找到未来的同班同学吗？这不是幻想，大家的联系方式这里都有！",
            color:"#54c9ff",
            Link:"classmate",
        },
    ],
    render: function() {
        return (
            <div>
              <Navbar /> 
              <Header color="blue" headerTitle="Providing services for students." headerParagraph={<p>"Talk is cheap,Show me the code." <br/> {"Linus Torvalds"}</p>} subHeader={true} />
                <section className="section">
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
