var React = require('react');
var Reflux = require('reflux');

var Bs = require('react-bootstrap');
var Button = Bs.Button,  Carousel = Bs.Carousel ,CarouselItem = Bs.CarouselItem , Row = Bs.Row ,Col = Bs.Col;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var InfoItem = require('./InfoItem.jsx');
var Navbar = require('./Navbar.jsx');

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
                <Carousel >
                    <CarouselItem>
                      <img  height={400} alt='900x500' src='http://www.ttjj666.com/img/logo1.jpg'/>
                      <div className='carousel-caption'>
                        <h3>你明白的，为什么</h3>
                        <p>会来到这座城市</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <img  height={400}  alt='900x500' src='http://www.ttjj666.com/img/logo2.jpg'/>
                      <div className='carousel-caption'>
                        <h3>我梦里的风景</h3>
                        <p>这里全部都有</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <img height={400}  alt='900x500' src='http://www.ttjj666.com/img/logo3.jpg'/>
                      <div className='carousel-caption'>
                        <h3>给你</h3>
                        <p>我们所共同拥有的</p>
                      </div>
                    </CarouselItem>
                  </Carousel>


                <div className="container text-center" style={{"marginTop":30,"marginBottom":50}}>
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
                <hr /> 
                <footer className="footer" >
                      <div className="container">
                          <p className="text-muted text-center" >Copyright &copy; 2015 周左左 All rights reserved.</p>
                      </div>
                </footer>

            </div>


        );
    }
});

module.exports = Home;
