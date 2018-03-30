import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onToggleBtnClick: function() {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    }
  }
});

