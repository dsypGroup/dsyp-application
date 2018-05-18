import Ember from 'ember';

export function isDeviceLimitExceeded(units) {
    var unitsUsed = units[0];
    var unitLimit = units[1];

    if (unitsUsed > unitLimit) {
        return "device-units-exeeded ";
    } else {
        return "";
    }
}

export default Ember.Helper.helper(isDeviceLimitExceeded);