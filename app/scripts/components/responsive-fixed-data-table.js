'use-strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Table = require('fixed-data-table').Table;
var debounce = require('debounce');

var ResponsiveFixedDataTable = React.createClass({displayName: "ResponsiveFixedDataTable",
	mixins: [ PureRenderMixin ],

	propTypes: {
		refreshRate: React.PropTypes.number
	},

	getDefaultProps: function() {
		return {
			refreshRate: 250 // ms
		};
	},

	getInitialState: function() {
		return {
			gridWidth: 1,
			gridHeight: 1
		};
	},

	componentDidMount: function() {
		this._setDimensionsOnState();
	},

	componentWillMount: function() {
		this._setDimensionsOnState = debounce(this._setDimensionsOnState, this.props.refreshRate);
		this._attachResizeEvent();
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize');
	},

	_attachResizeEvent: function() {
		var win = window;

		if (win.addEventListener) {
			win.addEventListener('resize', this._setDimensionsOnState, false);
		} else if (win.attachEvent) {
			win.attachEvent('resize', this._setDimensionsOnState);
		} else {
			win.onresize = this._setDimensionsOnState;
		}
	},

	_setDimensionsOnState: function() {
		if (this.isMounted()) {
			var tableWrapperNode = this.getDOMNode();
			this.setState({
				gridWidth: tableWrapperNode.offsetWidth,
				gridHeight: tableWrapperNode.offsetHeight
			});
		}
	},

	/**
	 * @return {ReactDOMNode}
	 */
	render: function() {
		var wrapperStyle = { width: '100%', height: '100%' };

		return (
			React.createElement("div", {style: wrapperStyle}, 
				React.createElement(Table, React.__spread({},  this.props, {ref: "table", width: this.state.gridWidth, height: this.state.gridHeight}))
			)
		);
	}
});

module.exports = ResponsiveFixedDataTable;