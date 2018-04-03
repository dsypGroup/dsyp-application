import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onToggleBtnClick: function() {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    }

    //onSaveClicked: function (users) {
    //  var staticId = Math.floor(Date.now() / 1000);
    //
    //  var newRecord = this.store.createRecord('users', {
    //    userName: users.userName,
    //    currentPassword: users.password,
    //    newPassword: users.newPassword,
    //    confirmNewPassword: users.confirmNewPassword,
    //    id: staticId
    //  });
    //
    //  newRecord.save();

      // this.set('isShowAddDevices', false);
    //}
  }
});

