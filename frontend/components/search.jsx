var React = require('react');
var PropTypes = React.PropTypes;
var MapActions = require('../actions/mapActions');

var Search = React.createClass({

  getInitialState: function() {
    return {
      search: "",
      show: false
    }
  },

  componentDidMount: function() {
    function initialize() {
      var input = document.getElementsByClassName('form-control')[0];
      var autocomplete = new google.maps.places.Autocomplete(input);
      }

      google.maps.event.addDomListener(window, 'load', initialize);
  },

  getGeoCode: function() {
    var geocoder = new google.maps.Geocoder();
    var that = this;

    geocoder.geocode( { 'address' : this.state.search }, function( results, status ) {
      if( status == google.maps.GeocoderStatus.OK ) {
        MapActions.updateMap(results[0])
        $('.form-control')[0].value = ""
        if (that.state.show === false) {
          $('#detail-container').animate({'width': 'toggle'});

          that.setState({
            show: true
          })
        }
      } else {
        alert( 'Geocode was not successful for the following reason: ' + status );
      }
    });
  },

  handleClick: function(e) {
    e.preventDefault();
    $('#detail-container').animate({'width': 'toggle'}, 300);

    this.setState({
      show: !this.state.show
    })

    this.props.toggleDetail()
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.getGeoCode();
  },

  handleChange: function(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value
    })
  },

  render: function() {
    return (
      <div id="form-container" className="container">
        <span className="glyphicon glyphicon-list" onClick={this.handleClick}></span>
        <form id="form" className="row" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control has-feedback" onChange={this.handleChange} type="text" placeholder="Search GooBing Maps"/>
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = Search;
