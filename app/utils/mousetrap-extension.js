/* global Mousetrap */
import Ember from 'ember';

export default (function (Mousetrap) {
    var _oldBind = Mousetrap.prototype.bind;
    var _unBindSuper = Mousetrap.prototype.unbind;
    var callbackRegister = {}; // Keep a map of shortcut keys , widget key and callback function

    Mousetrap.prototype.bind = function (key, callback, widgetId, action) {
        var that = this;

        if (callbackRegister[key] !== undefined) {
            callbackRegister[key][widgetId] = callback;
        } else {
            callbackRegister[key] = {};
            callbackRegister[key][widgetId] = callback;
            _oldBind.call(that, key, __mouseEventHandler, action); // All keys are bound to a common function
        }
    };

    Mousetrap.prototype.unbind = function (key, widgetId, action) {
        var that = this;

        if (callbackRegister[key] !== undefined && callbackRegister[key][widgetId] !== undefined) {
            callbackRegister[key][widgetId] = undefined;
            _unBindSuper.call(that, key, action);
        }
    };

    function __mouseEventHandler(e) {
        var key;

        if (e.altKey) {
            key = 'alt+' + e.key.toLowerCase();
        } else if (e.ctrlKey) {
            key = 'ctrl+' + e.key.toLowerCase();
        } else if (e.shiftKey) {
            key = 'shift+' + e.key.toLowerCase();
        } else {
            key = e.key.toLowerCase();

            if (key === 'escape') {
                key = 'esc';
            } else if (key === ' ') {
                key = 'space';
            }
        }

        var activeWidget = Ember.appGlobal.activeWidget; // Get current active widget
        var callBack;

        if (callbackRegister[key].global) {
            callBack = callbackRegister[key].global; // Global shortcut keys
        } else {
            callBack = callbackRegister[key][activeWidget]; // Shortcuts which bound to widget keys
        }

        if (callBack !== undefined) {
            return callBack.call(e);
        }

        return true;
    }
})(Mousetrap);