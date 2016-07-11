var React = require('react');
var PropTypes = React.PropTypes;
var DetailStore = require('../stores/details');
var Logo = require('./logo');
var Location = require('./location');
var MapStore = require('../stores/map');

var Details = React.createClass({
  getInitialState: function() {
    return ({
      details: DetailStore.details(),
      location: MapStore.location()
    })
  },

  componentDidMount: function() {
    this.detailsListener = DetailStore.addListener(this._onChange)
    this.mapListener = MapStore.addListener(this._mapChange)
    $('#pano').toggle()
  },

  componentWillUnmount: function() {
    this.detailsListener.remove()
    this.mapListener.remove()
  },

  _mapChange: function() {
    this.setState({
      location: MapStore.location()
    })
  },

  _onChange: function() {
    this.setState({
      details: DetailStore.details(),
    })
    // creates new pano map every search
    var panoEl = document.getElementById('pano');
    var location = this.state.location
    this.panorama = new google.maps.StreetViewPanorama(
      panoEl, {
        position: {
          lat: location.geometry.location.lat(),
          lng: location.geometry.location.lng()
        },
        pov: {
          heading: 34,
          pitch: 10
        }
      });

    if (panoEl.children.length > 1) {
      // removes first pano map if more than one
      panoEl.children[0].remove();
    }
  },

  handleScroll: function(e) {
    e.preventDefault();
    var element = $('.locations')
    var windowSize = element.width();
    //
    if (e.target.id === "left-chev") {

        $('.locations').animate({scrollLeft: element.scrollLeft() - 450}, 800);
    } else if (e.target.id === "right-chev"){

        $('.locations').animate({scrollLeft: element.scrollLeft() + 450}, 800);
    }
  },

  render: function() {
    var details;
    var locations;
    var allLoc;
    if (Object.keys(this.state.details).length === 0) {
      details = (
        <div>
          <Logo/>
        </div>
      )
    } else {
      details = (
        <div className="details">
          <p className="detail-address center">
            {this.state.details.formatted_address}
          </p>
        </div>
      )

      if (this.state.details.photos) {
        locations = this.state.details.photos.map(function(location,idx) {
          return (
            <Location key={idx} location={location}/>
          )
        })

        allLoc = (
          <div className="detail-bottom">
            <div className="locations-label center">
              <p className="location-label-text">
                <strong>Popular Destinations</strong>
              </p>
            </div>
            <div className="column center chevron" id="left" onClick={this.handleScroll}>
              <i className="fa fa-chevron-left fa-3x" id="left-chev" aria-hidden="true"></i>
            </div>

            <div className="locations rows">
              {locations}
            </div>

            <div className="column center chevron" id="right" onClick={this.handleScroll}>
              <i className="fa fa-chevron-right fa-3x" id="right-chev" aria-hidden="true"></i>
            </div>
            <hr/>
            <div className="detail-footer">
              <Logo/>
            </div>
          </div>
        )
      } else {
        allLoc = (
          <div className="no-loc">
            <Logo/>
          </div>
        )
      }
    }

    return (
      <div id="detail-container" className="initially-hidden">
        <div id="pano">
        </div>
        {details}
        {allLoc}
      </div>
    );
  }

});

module.exports = Details;
