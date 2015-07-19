var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var Layout = require('./components/layout');
var Home = require('./components/home');
var Classmate = require('./components/classmate');
var Login = require('./components/login');
var Xuanke = require('./components/Xuanke');
var Wall = require('./components/Wall');
var AddWish = require('./components/AddWish');

var routes = (
	<Route name="layout" path="/" handler={Layout}>
		<Route name="home" handler={Home} />
		<Route name="classmate" handler={Classmate} />
		<Route name="login" handler={Login} />
		<Route name="xuanke" handler={Xuanke} />
		<Route name="wall" handler={Wall} />
			<Route name="addWish" handler={AddWish} />
		<DefaultRoute handler={Home} />

	</Route>
);

exports.start = function() {
  
  Router.run(routes, function (Handler) {
		React.render(<Handler />, document.getElementById('content'));
	});
}
