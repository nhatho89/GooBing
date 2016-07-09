var React = require('react');
var PropTypes = React.PropTypes;
var Search = require('./search');
var Map = require('./map');
var Details = require('./details');

var App = React.createClass({

  getInitialState: function() {
    return {
      showDetail: false
    }
  },

  toggleDetail: function() {
    this.setState({
      showDetail: !this.state.showDetail
    })
  },

  render: function() {
    return (
      <div className="no-overflow">
        <Details showDetail={this.state.showDetail}/>
        <Search toggleDetail={this.toggleDetail}/>
        <Map/>
        <img className="cross cross-logo" src="./image/logo.gif"/>
        <img className="cross" src="./image/red_x.png"/>
      </div>
    );
  }

});

module.exports = App;
