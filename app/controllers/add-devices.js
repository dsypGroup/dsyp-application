import Ember from 'ember';

export default Ember.Controller.extend({

  isAddClicked: true,
  isShowAddDevices: true,

  onLoad: function () {
    this.get('model');
  },

  actions: {
    onToggleBtnClick: function () {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    },

    onclickAddBtn: function (device) {
      var staticId = Math.floor(Date.now() / 1000);

      if (!device.grp) {
        device.grp = "Bulb"
      }

      if (!device.devicePort) {
        device.devicePort = "devicePort1"
      }

      var newRecord = this.store.createRecord('device', {
        devicePort: device.devicePort,
        deviceName: device.nme,
        deviceGroup: device.grp,
        deviceStatus: 'Off',
        unitLimit: device.lmt,
        deviceUnits: 0,
        id: staticId
      });

      newRecord.save();

      this.set('isShowAddDevices', false);
    },

    showAddDevicePage: function () {
      this.set('isShowAddDevices', true);
      this.set('device.grp', '');
      this.set('device.devicePort', '');
    },

    onSelectEntityType: function (grp) {
      this.set('grp', grp);
    },

    onSelectPortType: function (port) {
      this.set('devicePort', port);
    }
  }
});
