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
    // Adds autocomplete for address search query box
    function initialize() {
      var input = document.getElementsByClassName('form-control')[0];
      var autocomplete = new google.maps.places.Autocomplete(input);
      }
      google.maps.event.addDomListener(window, 'load', initialize);

  },

  getGeoCode: function() {
    var geocoder = new google.maps.Geocoder();
    var that = this;
    // hits the google map Library to get map data from search.
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
        console.log( 'Geocode was not successful for the following reason: ' + status );
      }
    });
    $('#chatAudio')[0].play();
  },

  handleClick: function(e) {
    //handles map details animation on left side of application
    e.preventDefault();
    if (e.target.className === "glyphicon glyphicon-search") {
      this.getGeoCode();
    } else {
      $('#detail-container').animate({'width': 'toggle'}, 300);
      this.setState({
        show: !this.state.show
      })
      this.props.toggleDetail()
    }
  },

  handleSubmit: function(e) {
    // handles the search event when clicking the search glass icon
    e.preventDefault();
    var that = this;
    this.setState({
      search: e.target.childNodes[0].childNodes[0].value
    })

    setTimeout(function(){
      that.getGeoCode();
    }, 300)
  },

  handleChange: function(e) {
    e.preventDefault();

    // updates the search state as you type into the query box
    this.setState({
      search: e.target.value
    })

    var that = this;
    // triggers setState when you click on any section of the autocomplete dropdown
    // timeout is implemented in order to allow state change before firing query event
    setTimeout(function(){
      $('.pac-item').on('mousedown',function(e){
        e.preventDefault();
        if (e.target.tagName === "DIV") {
          that.setState({
            search: e.target.children[1].innerText + ' ' + e.target.children[2].innerText
          })
        } else if (e.target.className === "pac-matched") {
          that.setState({
            search: e.target.parentNode.parentNode.children[1].innerText + ' ' + e.target.parentNode.parentNode.children[2].innerText
          })
        } else if (e.target.className === "pac-item-query" || e.target.tagName === "SPAN") {
          that.setState({
            search: e.target.parentNode.children[1].innerText + ' ' + e.target.parentNode.children[2].innerText
          })
        }

        that.getGeoCode()
        // $(".pac-container").toggle()
      }.bind(that))
    },300)
  },

  render: function() {
    return (
      <div id="form-container" className="container">
        <span className="glyphicon glyphicon-list" onClick={this.handleClick}></span>
        <form id="form" className="row" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" onChange={this.handleChange} type="text" placeholder="Search GooBing Maps"/>
            <span className="glyphicon glyphicon-search" onClick={this.handleClick} ></span>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = Search;
