(function () {
    'use strict';
    function registerCtrl ($rootScope, $scope, $state, user) {
        $scope.registrationFailed = false;
        $scope.register = function () {
            if($scope.registerForm.$valid) {
                user.register($scope.email, $scope.password).success(function () {
                    user.checkSession().then(function () {
                        $state.go('contacts');
                        $rootScope.$broadcast('Phonebook.logged');
                    });
                }).error(function () {
                    $scope.registrationFailed = true;
                });
            }
        };
    }
    registerCtrl.$inject = ['$rootScope', '$scope', '$state', 'Phonebook.user'];

    angular.module('Phonebook')
        .controller('Phonebook.registerCtrl', registerCtrl);
})();