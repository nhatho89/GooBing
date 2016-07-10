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
    // debugger
    var geocoder = new google.maps.Geocoder();
    var that = this;
    // debugger

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
    console.log('submit');
    e.preventDefault();
    var that = this;
    // debugger
    this.setState({
      search: e.target.childNodes[0].childNodes[0].value
    })

    setTimeout(function(){
      // debugger
      that.getGeoCode();
    }, 200)
  },

  handleChange: function(e) {
    e.preventDefault();

    this.setState({
      search: e.target.value
    })

    // var items = $(".pac-container")[0].childNodes;
    var that = this;
    setTimeout(function(){

      $('.pac-item').on('mousedown',function(e){
        e.preventDefault();
        console.log(e.target);
        if (e.target.tagName === "DIV") {
          that.setState({
            search: e.target.children[1].innerText + ' ' + e.target.children[2].innerText
          })
        } else if (e.target.tagName === "SPAN") {
          that.setState({
            search: e.target.parentNode.children[1].innerText + ' ' + e.target.parentNode.children[2].innerText
          })
        }
        $(".pac-container").toggle()
        that.getGeoCode()
      }.bind(that))
      // if (items.length > 0) {
      //   for (var i = 0; i < items.length; i++) {
      //     items[i].addEventListener('mousedown',function(e) {
      //       e.preventDefault();
      //       console.log(e.target);
      //       that.setState({
      //         search: e.target.children[1].innerText + ' ' + e.target.children[2].innerText
      //       })
      //       that.getGeoCode()
      //     }.bind(that))
      //   }
      // }
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
