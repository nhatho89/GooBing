var React = require('react');
var PropTypes = React.PropTypes;

var Location = React.createClass({

  render: function() {
    // debugger
    return (
      <div>
        <img className="location-image" src={this.props.location.getUrl({'maxWidth': 200, 'maxHeight': 200})}/>
      </div>
    );
  }

});

module.exports = Location;
