var Dispatcher = require('../dispatcher');
var Store = require('flux/utils').Store;
var Constants = require('../constants');

var MapStore = new Store(Dispatcher);

var _location = {}


receiveLoc = function(loc) {
  _location = loc
};

MapStore.location = function () {
  return _location
};

MapStore.__onDispatch = function (payload) {
  switch(payload.actionType){
    case Constants.UPDATE_MAP:
      receiveLoc(payload.loc)
      MapStore.__emitChange();
      break;
  }
};

module.exports = MapStore;
