(function (window) {
  "use strict";
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var SLIDER_SELECTOR = '#strengthLevel';
  var SLIDER_VALUE_DISPLAY_SELECTOR = "#sliderValueDisplay";
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);

  var myTruck;
  remoteDS.getAll()
    .then(function () {
      myTruck = new Truck('ncc-1701', remoteDS);
    })
    .catch(function (error) {
      console.error('Failed to connect to server: ', error);
      myTruck = new Truck('ncc-1701', new DataStore());
    });
  myTruck = new Truck('ncc-1701', new DataStore());  
  window.myTruck = myTruck;
  
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  
  var FormHandler = new FormHandler(FORM_SELECTOR, SLIDER_SELECTOR, SLIDER_VALUE_DISPLAY_SELECTOR);
  FormHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function () {
        checkList.addRow.call(checkList, data);
      });
  });

  // FormHandler.addInputHandler(Validation.isCompanyEmail);
  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);