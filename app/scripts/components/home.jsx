var React = require('react');

var Home = React.createClass({

  render: function() {

    return (
      <div className="hero-unit">
        <h1>'Allo, 'Allo!</h1>
        <p>Hello World</p>
        <ul>
            <li>ReactJS Reflux Boilerplate</li>
        </ul>
      </div>
    );
  }
});

module.exports = Home;
