import Component from '@ember/component';

export default Component.extend({
  isSideBarOpened: false,

  actions: {
    onToggleBtnClick: function () {
      $(".page-wrapper").toggleClass('sidebar-opened');
      $(".page-wrapper").toggleClass('sidebar-closed');
    }
  }
});
