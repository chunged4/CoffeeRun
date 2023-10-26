(function (window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;
  
    var data = {};
    function DataStore() { 
      console.log('>>> info: running DataStore');
    }

    function promiseResolvedWith(value) {
      var promise = new Promise(function (resolve, reject) {
        resolve(value);
      });
      return promise;
    }
  
    DataStore.prototype.add = function(key, val) { 
      data[key] = val;
      return promiseResolvedWith(null);
    };
    DataStore.prototype.get = function(key) { 
      return promiseResolvedWith(this.data[key]);
    };
    DataStore.prototype.getAll = function() { 
      return promiseResolvedWith(data); 
    };
    DataStore.prototype.remove = function(key) {
      delete data[key];
      return promiseResolvedWith(null);
    };

    DataStore.runTests = function() {
      var App = window.App;
      var DataStore = App.DataStore;
      
      var key = "theKey"; 
      var testStore = new DataStore();
      testStore.add(key, 123);
      console.log(testStore.get(key));
      testStore.remove(key);
      console.log(testStore.getAll());
    };
  
    App.DataStore = DataStore;
    window.App = App;
  })(window);