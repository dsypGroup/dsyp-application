import Ember from 'ember';
import utils from '../utils/utils';

export default Ember.Controller.extend({
    isLoginClicked: false,
    isSignUpClicked: false,
    isAuthenticated: false,
    isHomeViewEnabled: false,
    user: '',

    model: {},

    actions: {
        clickLoginWinBtn: function () {
            this.set('isLoginClicked', true);
            this.set('isSignUpClicked', false);
        },

        clickSignUpWinBtn: function () {
            this.set('isLoginClicked', false);
            this.set('isSignUpClicked', true);
        },

        clickLoginBtn: function (user) {
            var loginMsgElem = Ember.$('div#loginMsg');
            var username = user.uname;
            var password = user.pwd;
            var that = this;

            //send a ajax request to the server to authenticate
            if (utils.validators.isAvailable(username) && utils.validators.isAvailable(password)) {
                $.ajax({
                    type: "POST",
                    url: "http://ec2-18-188-126-17.us-east-2.compute.amazonaws.com:3000/api/login",
                    data: {username: username, password: password}
                }).then(function (resp) {
                    if (resp == 200) {
                        that.set('isAuthenticated', true);
                        that.set('user', username);
                    } else if (resp == 0) {
                        //Show password or username incorrect message
                        loginMsgElem.css('background-color', '#e15848');
                        loginMsgElem.html("Username Or Password is Incorrect").show();
                        that.set('isAuthenticated', false);
                    } else {
                        //Show password or username empty message
                        loginMsgElem.css('background-color', '#e15848');
                        loginMsgElem.html("Authentication Failed").show();
                    }
                }).catch(function (error) {
                    // handle errors here
                    loginMsgElem.css('background-color', '#e15848');
                    loginMsgElem.html("Application Server Error").show();
                });
            } else {
                //Show password or username empty message
                loginMsgElem.css('background-color', '#e15848');
                loginMsgElem.html("Username Or Password is empty").show();
                that.set('isAuthenticated', false);
            }
        },

        logOutBtnActionPerformed: function () {
            this.set('isAuthenticated', false);
            this.set('isHomeViewEnabled', false);
        }
    }
});
