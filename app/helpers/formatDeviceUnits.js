import Ember from 'ember';

export function formatDeviceUnits(units) {
    return Number(units).toFixed(4);
}

export default Ember.Helper.helper(formatDeviceUnits);