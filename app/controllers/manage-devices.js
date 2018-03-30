import Ember from 'ember';

export default Ember.Controller.extend({
  isManageClicked: false,

  actions: {
    onToggleBtnClick: function () {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    },

    onManageBtnClicked: function (device) {
      var manageDeviceAreaEl = document.getElementById(device.data.deviceName);

      if(!this.get('isManageClicked')) {
        manageDeviceAreaEl.style.display = "inline";
        this.set('isManageClicked', true);
      } else {
        manageDeviceAreaEl.style.display = "none";
        this.set('isManageClicked', false);
      }
    },

    onDeviceOnBtnClicked: function (device) {
        var newDeviceStatus = 'On';
        var onDevice = this.get('model').findBy('id', device.id);
        onDevice.set('deviceStatus', newDeviceStatus);
        onDevice.save();
    },

    onDeviceOffBtnClicked: function (device) {
      var newDeviceStatus = 'Off';
      var offDevice = this.get('model').findBy('id', device.id);
      offDevice.set('deviceStatus', newDeviceStatus);
      offDevice.save();
    },

    onRemoveBtnClicked: function (device){
      var remove = this.get('model').findBy('id', device.id);
      remove.destroyRecord().then(function(respons) {
        console.log('Response' + respons);
      });
    }
  }
});
