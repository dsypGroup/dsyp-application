import Ember from 'ember';

export default Ember.Controller.extend({

    isAddClicked: true,
    isShowAddDevices: true,

    model: function() {
        return this.store.findAll('device');
    },

    onLoad: function () {
        var that = this;
        Ember.run.later(function () {
            that.disableUsedOptions();
        }, 2500);
    }.on('init'),

    //disableDropdownOption: function () {
    //    if ($('#devicePortSelection option:selected').val()) {
    //        Ember.disableOption = $('#devicePortSelection option:selected').val();
    //        $("#devicePortSelection option:disabled").prop("disabled", false);
    //        $("#devicePortSelection option:selected").prop("disabled", true);
    //    }
    //},

    disableUsedOptions: function () {
        var model = this.get('model');

        if (model) {
            var devices = model.content;

            var dropDown = document.getElementById("devicePortSelection");

            for (var j = 0; j < devices.length; j++) {
                var addedDevicePort = devices[j]._data.devicePort;

                for (var i = 0; i < dropDown.options.length; i++) {
                    if (dropDown.options[i].value === addedDevicePort) {
                        $('[value=' + addedDevicePort + ']').prop("disabled", true);
                    }
                }
            }
        }
    },

    _setDisableDevice: function () {
        if (Ember.disableOption) {
            $("#devicePortSelection option:contains('Value " + Ember.disableOption + "')").attr("disabled", "disabled");
            $("#devicePortSelection").prop("selectedIndex", -1)
        }
    },

    onSelectPortType: function (port) {
        //this.disableDropdownOption();
        this.set('devicePort', port);
    },

    actions: {
        onToggleBtnClick: function () {
            $(".page-wrapper").toggleClass('sidebar-opened');
            $(".page-wrapper").toggleClass('sidebar-closed');
        },

        onclickAddBtn: function (device) {
            this.disableUsedOptions();

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
            var that = this;
            Ember.run.later(function () {
                that.disableUsedOptions();
            }, 2500);

            // this.onSelectPortType();

            this.set('isShowAddDevices', true);
            this.set('device.grp', '');
            //this.set('device.devicePort', '');
            Ember.run.later(this, this._setDisableDevice, 600);
        },

        onSelectEntityType: function (grp) {
            this.set('grp', grp);
        },

        onSelectPortType: function () {
            this.onSelectPortType($('#devicePortSelection option:selected').val());

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
