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

      var newRecord = this.store.createRecord('device', {
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
    },

    onSelectEntityType: function (grp) {
      this.set('grp', grp);
    }
  }
});
