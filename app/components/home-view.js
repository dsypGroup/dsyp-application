import Component from '@ember/component';

export default Component.extend({
  isDefaultLandingPage: true,

  actions: {
    renderdefaulLandinPage: function() {
      this.set('isFlashScreen', false);
      this.set('isDefaultLandingPage', true);
    },

    onToggleBtnClick: function() {
      (".page-wrapper").toggleClass('sidebar-opened');
      (".page-wrapper").toggleClass('sidebar-closed');
    },

    clickConnectBtn: function() {
      this.set('isConnect', true);
      this.setAuthenticated();
    },

    onHomeBtnClick: function() {

    }
  }
});
