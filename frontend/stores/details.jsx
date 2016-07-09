var Dispatcher = require('../dispatcher');
var Store = require('flux/utils').Store;
var Constants = require('../constants');

var DetailStore = new Store(Dispatcher);

var _details = {

}

receiveDetail = function(details) {
  _details = details
};

DetailStore.details = function() {
  return _details
};

DetailStore.__onDispatch = function (payload) {
  switch(payload.actionType){
    case Constants.RECEIVE_DETAIL:
      receiveDetail(payload.details)
      DetailStore.__emitChange();
      break;
  }
};

module.exports = DetailStore;
