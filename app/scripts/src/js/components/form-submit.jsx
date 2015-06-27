var React = require('react');
var classnames = require('classnames');
var Bs = require('react-bootstrap');
var Button = Bs.Button ;


var Submit = React.createClass({

  getInitialState: function () {
    return {
      disabled: this.props.locked,
      bsStyle:this.props.bsStyle || 'primary',
      bsSize:this.props.bsSize || '' ,
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.locked !== this.props.locked) {
      this.setState({ disabled:nextProps.locked });
    }
  },

  render: function () {
    var text = this.props.text || this.props.label
    if (text instanceof Array) {
      var i = this.state.disabled && text.length > 1 ? 1: 0
      text = text[i]
    }

    var button = <Button className={this.props.className} bsStyle={this.state.bsStyle}  bsSize={this.state.bsSize} disabled={this.state.disabled} type="submit" style={this.props.style} >{text}</Button> ;
    button = <div className="form-group">        
                {button}
            </div>;
    
    return button ;
  }
})

module.exports = Submit
