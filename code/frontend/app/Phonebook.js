(function () {
    'use strict';
    angular.module('Phonebook', ['ngMaterial', 'ui.router'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/main.tpl',
                    controller: 'Phonebook.mainCtrl'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'templates/register.tpl',
                    controller: 'Phonebook.registerCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.tpl',
                    controller: 'Phonebook.loginCtrl'
                })
                .state('contacts', {
                    url: '/contacts',
                    templateUrl: 'templates/contacts.tpl',
                    controller: 'Phonebook.contactsCtrl'
                });
        }]);
})();
