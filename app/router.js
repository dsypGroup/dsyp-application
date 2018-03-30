import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  //this.route('display-devices');
  this.route('manage-devices');
  this.route('add-devices');
  this.route('manage');
  this.route('manage-tasks');
  this.route('notification-settings');
  this.route('manage');
  this.route('about-us');
  this.route('help');
  this.route('account-settings');
  this.resource('display-devices', function() {
    this.resource('display-devices', { path: '/:display-devices_id' });
  });
});

export default Router;
