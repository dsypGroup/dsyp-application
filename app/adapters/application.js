import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: 'http://ec2-18-217-238-61.us-east-2.compute.amazonaws.com:3000'
});
