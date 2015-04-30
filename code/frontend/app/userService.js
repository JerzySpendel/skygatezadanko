(function () {
    'use strict';
    function userService (api) {
        var logged = false;

        function login (email, password) {
            return api('login').post({
                email: email,
                password: password
            }).success(function (data, status, headers) {
                console.log(arguments);
                console.log(headers('Set-Cookie'));
                logged = email;
            });
        }
        function logout () {
            return api('logout').post({}).success(function () {
                logged = false;
            });
        }
        function register (email, password) {
            return api('register').post({
                email: email,
                password: password
            });
        }
        function isLogged () {
            return logged?true:false;
        }
        function getUser () {
            if(isLogged()) {
                return logged;
            } else {
                return null;
            }
        }
        function checkSession () {
            return api('account').get().success(function (data) {
               logged = data.email;
            });
        }

        this.isLogged = isLogged;
        this.getUser = getUser;
        this.login = login;
        this.register = register;
        this.logout = logout;
        this.checkSession = checkSession;
    }
    userService.$inject = ['Phonebook.api'];

    angular.module('Phonebook')
        .service('Phonebook.user', userService);
})();