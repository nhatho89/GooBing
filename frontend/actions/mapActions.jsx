var Dispatcher = require('../dispatcher');
var Constants = require('../constants');

var MapActions = {
  updateMap: function (value) {
    Dispatcher.dispatch({
      actionType: Constants.UPDATE_MAP,
      loc: value
    });
  },

  getDetail: function(place_id, map) {
    var request = {
      placeId: place_id
    }

    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(details,status) {
      Dispatcher.dispatch({
        actionType: Constants.RECEIVE_DETAIL,
        details: details
      });
    });
  },
};

module.exports = MapActions;
