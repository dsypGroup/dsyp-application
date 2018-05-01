import Ember from 'ember';

export default Ember.Controller.extend({
  isManageClicked: false,
  isCancelClicked: false,
  isCheckBillClicked: false,
  isShowDevices: true,
  // isAutomated: false,

  model: function() {
    return this.store.findAll('device');
  },

    actions: {
        onToggleBtnClick: function() {
            $(".page-wrapper").toggleClass('sidebar-opened');
            $(".page-wrapper").toggleClass('sidebar-closed');
        },

      showDevices: function () {
        this.set('isShowDevices', false);
      },

      saveResults: function (device) {
        var that = this;
        this.set('isShowDevices', true);
        var model = this.get('model.content');

        if (model && model.length > 0) {
          Ember.$.each(model, function (index, device) {
            var device = that.get('model').findBy('id', device.id);
            var isAutomated = $('#' + device.id).is(":checked");

            device.set('isDeviceAutomated', isAutomated);
            device.save();
          });
        }
      },

      onTurnOffClicked: function() {
        var loginMsgElem = Ember.$('div#turnOffPopUp');

        if(!this.get('isManageClicked')) {
          loginMsgElem.removeClass("display-none");
          loginMsgElem.addClass("display-inline");
          this.set('isManageClicked', true);
        } else {
          loginMsgElem.removeClass("display-inline");
          loginMsgElem.addClass("display-none");
          this.set('isManageClicked', false);
        }
      },

      onTurnOnClicked: function(device) {
        var loginMsgElem = Ember.$('div#turnOnPopUp');

        if(!this.get('isManageClicked')) {
          loginMsgElem.removeClass("display-none");
          loginMsgElem.addClass("display-inline");
          this.set('isManageClicked', true);
        } else {
          loginMsgElem.removeClass("display-inline");
          loginMsgElem.addClass("display-none");
          this.set('isManageClicked', false);
        }
      },

      onDeviceOnBtnClicked: function (device) {
        var manageDeviceAreaEl = document.getElementById(device.data.deviceName);
        var newDeviceAdd = 'Added';
        var onDevice = this.get('model').findBy('id', device.id);
        onDevice.set('deviceAdded', newDeviceAdd);
        onDevice.save();
      },

      onDeviceOffBtnClicked: function (device) {
        var manageDeviceAreaEl = document.getElementById(device.data.deviceName);
        var newDeviceRemove = 'Removed';
        var offDevice = this.get('model').findBy('id', device.id);
        offDevice.set('deviceAdded', newDeviceRemove);
        offDevice.save();
      },

      onCalculateBillBtnClicked: function(device){
        //var checkBillArea = document.getElementById(device);
        if(!this.get('isCheckBillClicked')){
          //checkBillArea.style.display = "inline";
          this.set('isCheckBillClicked', true);
        }else{
          //checkBillArea.style.display = "none";
          this.set('isCheckBillClicked', false);
        }


      }
      //cancel: function() {
      //  var cancel = Ember.$('div#cancelAction');
      //
      //  if(!this.get('isCancelClicked')) {
      //    cancel.removeClass("display-none");
      //    cancel.addClass("display-inline");
      //    this.set('isCancelClicked', true);
      //  } else {
      //    cancel.removeClass("display-inline");
      //    cancel.addClass("display-none");
      //    this.set('isCancelClicked', false);
      //  }
      //},
      //
      //close: function() {
      //  var close = Ember.$('div#closeAction');
      //
      //  if(!this.get('isCancelClicked')) {
      //    close.removeClass("display-none");
      //    close.addClass("display-inline");
      //    this.set('isCancelClicked', true);
      //  } else {
      //    close.removeClass("display-inline");
      //    close.addClass("display-none");
      //    this.set('isCancelClicked', false);
      //  }
      //}
    }
});
