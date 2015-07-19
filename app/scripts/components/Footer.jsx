var React = require('react');

var Footer = React.createClass({
	render:function(){
		return(     
		<section>          
			 <footer className="footer" >
              <div className="container">
                <p className="text-muted text-center" >Copyright &copy; 2015 {this.props.name} All rights reserved.</p>
              </div>
            </footer>
        </section>
			);
	}
});

module.exports = Footer ;