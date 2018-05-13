import Ember from 'ember';

export default Ember.Controller.extend({

  isAddClicked: true,
  isShowAddDevices: true,

  onLoad: function () {
    this.disableDropdownOption();
    this.get('model');
  },

  disableDropdownOption: function () {
    $("#devicePortSelection option:disabled").prop("disabled", false);
    $("#devicePortSelection option:selected").prop("disabled", true);
  }.observes('device.devicePort'),

  actions: {
    onToggleBtnClick: function () {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    },

    onclickAddBtn: function (device) {
      this.disableDropdownOption();

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
      this.disableDropdownOption();

      this.set('isShowAddDevices', true);
      this.set('device.grp', '');
      //this.set('device.devicePort', '');
    },

    onSelectEntityType: function (grp) {
      this.set('grp', grp);
    },

    onSelectPortType: function (port) {
      this.disableDropdownOption();
      this.set('devicePort', port);

      //$("#devicePortSelection option:disabled").prop("disabled", false);
      //$("#devicePortSelection option:selected").prop("disabled", true);

      //var dropDown = document.getElementById("devicePortSelection");
      //for (var i = 0; i <= dropDown.options.length; i++) {
      //  if (dropDown.options[i].selected) {
      //    this.set('devicePort', port);
      //    dropDown.removeChild(dropDown.options[i]);
      //  }
      //}
    }

    //onReset: function () {
    //  // this.set('device.nme', '');
    //  this.set('device.grp', '');
    //  this.set('device.devicePort', '');
    //}
  }
});
