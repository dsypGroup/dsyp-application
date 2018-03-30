import Ember from 'ember';

export default Ember.Controller.extend({
  model: {},
  deviceCollection: {},

  onloadd: function () {
    this.get('model');
  }.observes('model'),

  actions: {
    onToggleBtnClick: function () {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    }
  }
});
