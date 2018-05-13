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

  calculateDevPerBill: function (units) {
    var charge_00 = 7.85;
    var charge_60 = 10;
    var charge_90 = 27.75;
    var charge_120 = 32;
    var charge_180 = 45;
    var chargeStep1 = 60*charge_00;
    var chargeStep2 = 90*charge_60;
    var chargeStep3 = 120*charge_90;
    var chargeStep4 = 180*charge_120;

    if (arguments.length < 1){
      throw new Error("Handlebars Helper equal needs 2 parameters");
    }

    if (units < 60 || units ==0 ) {
      return units * charge_00;
    } else if (units > 60 && units < 90) {
      return ((units - 60) * charge_60) + chargeStep1;
    } else if (units > 90 && units < 120){
      return ((units - 90) * charge_90) + chargeStep2;
    } else if (units > 120 && units < 180) {
      return ((units - 120) * charge_120) + chargeStep3 ;
    } else {
      return ((units - 180) * charge_180) + chargeStep4 ;
    }
  },

    actions: {
        onToggleBtnClick: function() {
            $(".page-wrapper").toggleClass('sidebar-opened');
            $(".page-wrapper").toggleClass('sidebar-closed');
        },

      showDevices: function () {
        var model = this.get('model.content');
        var that = this;

        Ember.run.later((function() {
          if (model && model.length > 0) {
            Ember.$.each(model, function (index, device) {
              var device = that.get('model').findBy('id', device.id);
              var lightSensorId = device.data.lightSensorId;
              var motionSensorId = device.data.motionSensorId;

              $('#' + motionSensorId).prop('checked', true);

              if (device.data.lightSensor == "enabled") {
                $('#' + lightSensorId).prop('checked', true);
              } else if (device.data.lightSensor == "disabled") {
                $('#' + lightSensorId).prop('checked', false);
              }

              if (device.data.motionSensor == "enabled") {
                $('#' + motionSensorId).prop('checked', true);
              } else if (device.data.motionSensor == "disabled") {
                $('#' + motionSensorId).prop('checked', false);
              }
            });
          }
        }), 200);

        this.set('isShowDevices', false);
      },

      saveResults: function (device) {
        var that = this;
        this.set('isShowDevices', true);
        var model = this.get('model.content');

        if (model && model.length > 0) {
          Ember.$.each(model, function (index, device) {
            var device = that.get('model').findBy('id', device.id);
            var motionSenseCheck = $('#' + device.data.motionSensorId).is(":checked");
            var lightSenseCheck = $('#' + device.data.lightSensorId).is(":checked");

            if (motionSenseCheck) {
              device.set('motionSensor', 'enabled');
            } else {
              device.set('motionSensor', 'disabled');
            }

            if (lightSenseCheck) {
              device.set('lightSensor', 'enabled');
            } else {
              device.set('lightSensor', "disabled");
            }

            device.save();
          });
        }
      },

      cancel: function() {
        this.set('isShowDevices', true);
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
      },

      showTotal: function (model) {
        var total = 0;
        var model = model;

        for (var i=0; i<model.content.length; i++) {
          total = total + this.calculateDevPerBill(model.content[i].__data.deviceUnits);
        }

        this.set('totalBill', total);
      }
    }
});
