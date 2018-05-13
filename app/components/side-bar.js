import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  isSideBarOpened: false,

  didRender() {
    this._super(...arguments);
    $('a').each(function() {
      if ($(this).prop('href') == window.location.href) {
        $(this).addClass('current');
      }
    });
  },

  actions: {
    onToggleBtnClick: function () {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    }
  }
});
