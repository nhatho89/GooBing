var React = require('react');
var PropTypes = React.PropTypes;

var Logo = React.createClass({

  render: function() {
    return (
      <div>
        <img className="logo" src="./image/logo.gif"/>
      </div>
    );
  }

});

module.exports = Logo;
