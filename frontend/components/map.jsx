var React = require('react');
var PropTypes = React.PropTypes;
var MapStore = require('../stores/map');
var MapActions = require('../actions/mapActions');

var Map = React.createClass({
  getInitialState: function() {
    return {
      location: MapStore.location(),
      center: {
        lat: 37.7758,
        lng: -122.435
      }
    }
  },

  componentDidMount: function(){
    this.mapListener = MapStore.addListener(this._onChange)
    //creates main map once on document loaded
    var map = document.getElementById('gmap');
    var mapOptions = {
      draggable: true,
      center: this.state.center,
      zoom: 10
    };
    this.markers = [];
    this.map = new google.maps.Map(map, mapOptions);
    
  },

  componentWillUnmount: function() {
    this.mapListener.remove();
  },

  getBounds: function(location) {
    return new google.maps.LatLngBounds(
      location.geometry.viewport.getSouthWest(),
      location.geometry.viewport.getNorthEast()
    );
  },

  removeMarkers: function() {
    for(var i = 0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
    }
  },

  _onChange: function() {
    var that = this;
    // timeout is used to allow the pano map to be rendered
    setTimeout(function(){
      var location = MapStore.location();
      that.removeMarkers();
      MapActions.getDetail(location.place_id, that.map)
      var coor = that.getBounds(location);
      that.setState({
        center: {
          lat: location.geometry.location.lat(),
          lng: location.geometry.location.lng() + (coor.b.f - coor.b.b)
        }
      })
      coor.b.f = coor.b.f + (coor.b.b - coor.b.f)

      that.createMarker(location)
      // fit searched object boundaries on the map
      // could vary from city block to entire country
      that.map.fitBounds(coor);
    },300)

  },

  createMarker: function(location) {
    var placeLoc = location.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: location.geometry.location
    });
    this.markers.push(marker)
  },

  render: function() {
    return (
      <div id="gmap" className="gmap" ref="map">Map</div>
    );
  }

});

module.exports = Map;
