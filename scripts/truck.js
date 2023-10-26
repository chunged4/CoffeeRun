(function (window) {
    'use strict';
    var App = window.App || {};
  
    function Truck(truckId, db) { 
      console.log('>>> info: running Truck');
      this.truckId = truckId;
      this.db = db;
    }
  
    Truck.prototype.createOrder = function (order) {
      console.log('Adding order for ' + order.name);
      return this.db.add(order.name, order);
    };
  
    Truck.prototype.deliverOrder = function (customerId) {
      console.log('Delivering order for ' + customerId);
      return this.db.remove(customerId);
    };
  
    Truck.prototype.printOrders = function (printFn) {
      return this.db.getAll()
        .then(function (orders) {
          var customerIdArray = Object.keys(orders);
          console.log('Truck #' + this.truckId + ' has pending orders:');
          customerIdArray.forEach(function (id) {
            console.log(orders[id]);
            if (printFn) {
              printFn(orders[id]);
            }
          }.bind(this));
        }.bind(this));
    };
  
    Truck.runTests = function() { 
      var App = window.App;
      var Truck = App.Truck;
      var DataStore = App.DataStore;
      var enterprise = new Truck('ncc-1705', new DataStore());
  
      console.log('------------- running Truck tests ------------------------')
      enterprise.createOrder({ name: 'Walter White', order: 'caramel macciato' });
      enterprise.createOrder({ name: 'Gustavo Fring', order: 'boba' });
      enterprise.createOrder({ name: 'Jesse Pinkman', order: 'water' });
      enterprise.createOrder({ name: 'Saul Goodman', order: 'earl grey hot' });
      enterprise.createOrder({ name: 'Hank Schrader', order: 'coca-cola' });
      enterprise.createOrder({ name: 'Tuco Salamanca', order: 'triple espresso' });
      enterprise.printOrders();
  
      enterprise.deliverOrder('Walter White');
      enterprise.deliverOrder('Gustavo Fring');
      enterprise.deliverOrder('Saul Goodman');
      enterprise.printOrders();
  
      console.log('------------ finished Truck tests ------------------------')
    };
  
    App.Truck = Truck;
    window.App = App;
  })(window);