(function (window) {
  "use strict";
  var PAYMENT_FORM_SELECTOR = '[payment-information="form"]';

  var App = window.App;
  var PaymentHandler = App.PaymentHandler;
  var Validation = App.Validation;

  var PaymentHandler = new PaymentHandler(PAYMENT_FORM_SELECTOR);
  PaymentHandler.addSubmitHandler(function (data) {});
  
  PaymentHandler.addInputHandler(Validation.isCompanyEmail);

})(window);