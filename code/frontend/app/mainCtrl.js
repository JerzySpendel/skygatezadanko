(function () {
    'use strict';
    function mainCtrl ($scope, $state, user) {
        if(user.isLogged()) {
            $state.go('contacts');
        }
    }
    mainCtrl.$inject = ['$scope', '$state', 'Phonebook.user'];

    angular.module('Phonebook')
        .controller('Phonebook.mainCtrl', mainCtrl);
})();