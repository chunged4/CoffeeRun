(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
  
    function PaymentHandler(selector) {
      if (!selector) { 
        throw new Error('No selector provided in FormHandler')
      }
  
      this.$formElement = $(selector)
      if (this.$formElement.length === 0) {
        throw new Error('Could not find element with selector: ' + selector)
      }
    };
  
    PaymentHandler.prototype.addSubmitHandler = function(fn) { 
      console.log('Setting submit handler for payment form');
      this.$formElement.on('submit', function(event) { 
        event.preventDefault();
  
        var data = {};
        $(this).serializeArray().forEach(function (item) {
            data[item.name] = item.value;
        });
        console.log(data);
        fn(data);
        // this.reset();
        // console.log(this.elements[0]);
        // this.elements[0].focus();
        window.location.href = 'index.html';
      });
    };

    PaymentHandler.prototype.addInputHandler = function (fn) {
      console.log('Setting input handler for form');
      this.$formElement.on('input', '[name="usermail"]', function (event) {
        var emailAddress = event.target.value;
        var message = '';
        if (fn(emailAddress)) {
          event.target.setCustomValidity('');
        } else {
          message = emailAddress + ' is not an authorized email address!';
          event.target.setCustomValidity(message);
        }
      });
    };

    PaymentHandler.runTests = function() {
        var ph = new App.PaymentHandler('[data-coffee-order="form"]', '#strengthLevel', '#sliderValueDisplay');
        ph.addSubmitHandler();
    };
  
    App.PaymentHandler = PaymentHandler;
    window.App = App;
})(window);
