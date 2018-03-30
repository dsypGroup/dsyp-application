import DS from 'ember-data';

export default DS.Model.extend({
  deviceName: DS.attr('string'),
  deviceGroup: DS.attr('string'),
  deviceStatus: DS.attr('string'),
  unitLimit: DS.attr('string'),
  deviceUnits: DS.attr('string'),
  deviceAdded: DS.attr('string'),

  isDeviceOn: function () {
    return (this.get('deviceStatus') === 'On');
  }.property('deviceName', 'deviceStatus'),

  isDeviceAdded: function () {
    return (this.get('deviceAdded') === 'Added');
  }.property('deviceName', 'deviceAdded')
});
