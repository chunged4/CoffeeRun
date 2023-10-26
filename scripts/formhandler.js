(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
  
    function FormHandler(selector, sliderSelector, sliderValueDisplaySelector) {
      if (!selector) { 
        throw new Error('No selector provided in FormHandler')
      }
  
      this.$formElement = $(selector)
      if (this.$formElement.length === 0) {
        throw new Error('Could not find element with selector: ' + selector)
      }

      this.$slider = $(sliderSelector);
      if (this.$slider.length === 0) {
        throw new Error('Could not find slider withe selector: ' + sliderSelector);
      }

      this.$sliderValueDisplay = $(sliderValueDisplaySelector);
      if (this.$sliderValueDisplay.length === 0) {
        throw new Error('Could not find element with selector: ' + sliderSelector + 'Value');
      }

      this.initializeSlider();
    };

    FormHandler.prototype.initializeSlider = function () {
      var self = this;
      this.updateSliderValueLabel();

      this.$slider.on('input', function () {
        self.updateSliderValueLabel();
      });
    };

    FormHandler.prototype.updateSliderValueLabel = function () {
      this.$sliderValueDisplay.text(this.$slider.val());
    };
  
    FormHandler.prototype.addSubmitHandler = function(fn) { 
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function(event) { 
        event.preventDefault();
  
        var data = {};
        $(this).serializeArray().forEach(function (item) {
            data[item.name] = item.value;
            console.log(item.name + " is " + item.value);
        });
        console.log(data);
        fn(data)
          .then(function () {
            self.reset();
            this.elements[0].focus();
          }.bind(this));
        window.location.href = 'payment.html';
      });
    };

    // FormHandler.prototype.addInputHandler = function (fn) {
    //   console.log('Setting input handler for form');
    //   this.$formElement.on('input', '[name="emailAddress"]', function (event) {
    //     var emailAddress = event.target.value;
    //     var message = '';
    //     if (fn(emailAddress)) {
    //       event.target.setCustomValidity('');
    //     } else {
    //       message = emailAddress + ' is not an authorized email address!';
    //       event.target.setCustomValidity(message);
    //     }
    //   });
    // };

    FormHandler.runTests = function() {
        var fh = new App.FormHandler('[data-coffee-order="form"]', '#strengthLevel', '#sliderValueDisplay');
        fh.addSubmitHandler();
    };
  
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
