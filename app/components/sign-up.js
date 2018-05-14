import Component from '@ember/component';

export default Component.extend({

    actions: {
        setSignUp: function () {
            this.sendAction('setSignUp');
        },

        clickSignUp: function (user) {
            var userName = user.uname;
            var email = user.email;
            var password = user.pwd;
            var phone = user.phone;
            var confirmPassword = user.confpwd;

            if (password === confirmPassword) {
                $.ajax({
                    type: "POST",
                    url: "http://ec2-18-188-126-17.us-east-2.compute.amazonaws.com:3000/api/usersData",
                    data: {username: userName, email: email, phone: phone, password: password}
                }).then(function (resp) {

                }).catch(function (error) {
                    // handle errors here

                });

                this.sendAction('setSignUp');
            } else {

            }
        }
    }
});
