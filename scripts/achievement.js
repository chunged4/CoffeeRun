(function (window) {
    'use strict';
    var App = window.app || {};
    var $ = window.jQuery;

    function Achievement(selector) {
        if (!selector) {
            throw new Error('No selector provided in Achievement');
        }
        this.$achievementModal = $(selector);
        if (this.$achievementModal.length === 0) {
            throw new Error('Could not find element with selector: ' + selector)
        }
    }

    Achievement.prototype.checkCriteria = function (data) {
        console.log("checking criteria for achievement");
        if (data.size === 'coffee-zilla' && data.strength === '100' && (data.flavor === "caramel" || data.flavor === "almond" || data.flavor === "mocha")) {
            this.$achievementModal.modal('show');
        }
    }

    App.Achievement = Achievement;
    window.App = App;
})(window);