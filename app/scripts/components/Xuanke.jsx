
var React = require('react');
var Reflux = require('reflux');

var UserStore = require('../stores/UserStore.js');
var XuankeStore = require('../stores/XuankeStore.js');
var Actions = require('../actions/actions.js');

var Form = require('../src/js').Form;
var Bs = require('react-bootstrap');
var Input = Bs.Input ,Jumbotron = Bs.Jumbotron , Col = Bs.Col , Row = Bs.Row , PageHeader = Bs.PageHeader , Button = Bs.Button ;
var Select = require('react-select');
var Star = require('react-star-rating');

var Combobox = require('../src/js').Combobox;
var ComboboxOption = require('../src/js').Option;

var states = require('../states');

var Router = require('react-router');

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');


var Xuanke = React.createClass({
	mixins:[Reflux.connect(UserStore, 'UserStore'),Reflux.connect(XuankeStore,'XuankeStore')],
	handleFind:{
		findClassmate:Actions.findClassmate,
		setUserMessage:Actions.setUserMessage,
	},
	getInitialState: function () {
	    return {
	    		states: states,
      			selectedStateId: null,
	    		name: null,
	    		teacher: null,
	    		homework: null,
	    		well: null,
	    		roll: null,
	    		pattern: null,
	    };
	},
	componentWillMount:function(){
		if(!this.state.UserStore.user.hadLogin){window.location.href='#/login';return}

	}, 
	patternChange:function(val) {
    	this.setState({
    		pattern:val,
    	});
	},
	classChange:function(val) {
    	this.setState({
    		name:val,
    	});
	},
	teacherChange:function(val) {
    	this.setState({
    		teacher:val,
    	});
	},
	homeworkChange:function(e,data) {
    	this.setState({
    		homework:data.rating,
    	});
    	console.log(this.state);
	},
	rollChange:function(e,data) {
    	this.setState({
    		roll:data.rating,
    	});
    	console.log(this.state);
	},
	wellChange:function(e,data) {
    	this.setState({
    		well:data.rating,
    	});
    	console.log(this.state);
	},
  	handleInput: function(userInput) {
	    this.setState({selectedStateId: null}, function() {
	      this.filterStates(userInput);
	    }.bind(this));
	},
	filterStates: function(userInput) {
	    if (userInput === '')
	      return this.setState({states: states});
	    var filter = new RegExp('^'+userInput, 'i');
	    setTimeout(function() {
	      this.setState({states: states.filter(function(state) {
	        // you can match anything you want, not just the labels
	        return filter.test(state.name) || filter.test(state.id);
	      })});
	    }.bind(this), 500);
	},
	handleStateSelect: function(value) {
	    this.setState({
	      selectedStateId: value,
	      states: states
	    });
	},
	renderComboboxOptions: function() {
	    return this.state.states.map(function(state) {
	      return (
	        <ComboboxOption
	          key={state.id}
	          value={state.id}
	        >{state.name}</ComboboxOption>
	      );
	   	});
	},
	render:function(){
    var menuContent = this.state.states.length ?
      this.renderComboboxOptions() :
      <div style={{padding: '8px'}} aria-live="polite">没有找到相关的课程</div>;
		return(
			<div >
              <Navbar />
              <Header color="yellow" headerTitle="同济选课必知" headerParagraph={<p>想看看这节课点名频率和作业量吗? <br/> Just Now</p>} subHeader={true}  />
              <section className="section" >
	              <div className="container">
              		<PageHeader>添加个人评价 <small>for class</small></PageHeader>
					<Form ref="form" type="json" > 
						<Col xs={12} >
							<div className="form-group">
							<label style={{"fontSize":18,"marginRight":5}} >评价的课程: </label>
						        <Combobox
						          onInput={this.handleInput}
						          onSelect={this.handleStateSelect}
						          value={this.state.selectedStateId}
						        >
						          {menuContent}
						        </Combobox>
					        </div>
					    </Col>
						    <Col  xs={12} >
							    <div className="form-group" >
							    	<Star 
							    		name="homework" 
							    		caption="作业量:" 
							    		ratingAmount={5} 
							    		size="lg" 
							    		step={1} 
							    		onRatingClick={this.homeworkChange}
							    	/>
							    </div>
						    </Col>
						    <Col  xs={12} >
							    <div className="form-group" >
							    	<Star 
							    		name="roll" 
							    		caption="点名频率:"	    		
							    		ratingAmount={5} 
							    		size="lg" 
							    		step={1} 
							    		onRatingClick={this.rollChange} 
							    	/>
							    </div>
						    </Col>
						    <Col  xs={12} >
							    <div className="form-group" >
							    	<Star 
							    		name="well" 
							    		caption="拿优难度:" 
							    		ratingAmount={5} 
							    		size="lg" 					    		
							    		step={1} 
							    		onRatingClick={this.wellChange}/>
						        </div>
					        </Col>

				        	<Col  xs={12} style={{"marginTop":10}}>
				        		<div className="form-group" >
									<Select
									   	value={this.state.pattern}
								   	  	options={[
								   	  		{value:'闭卷考试',label:'闭卷考试'},
								   	  		{value:'开卷考试',label:'开卷考试'},
								   	  		{value:'写文章',label:'写文章'},
								   	  		{value:'实践',label:'实践'},
								   	  		{value:'无',label:'无'},
								   	  		{value:'其他',label:'其他'},
								   	  	]}
								   	  	onChange={this.patternChange}
								   	  	placeholder="请评价考试的形式"
									    searchable={false}
									/>
								</div>
						    </Col>
							<Col xs={12} >
								<div className="form-group" >
									<Input type='textarea'  placeholder='谈谈您对该老师上的这节课的个人看法与建议(可选)' />
								</div>
							</Col>
				        <Button  bsStyle='primary' bsSize="large" style={{"width":"100%"}} > 提交我的评价 </Button>
					</Form>
				  </div>
			  </section>
			  <Footer />
             </div>
			);
	}
});

module.exports = Xuanke ; 