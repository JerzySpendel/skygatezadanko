(function () {
    'use strict';
    function loginCtrl ($rootScope, $scope, $state, user) {
        $scope.login = function () {
            if($scope.loginForm.$valid) {
                user.login($scope.username, $scope.password).success(function () {
                    $state.go('contacts');
                    $rootScope.$broadcast('Phonebook.logged');
                }).error(function () {
                    $scope.loginFailed = true;
                });
            }
        }
    }
    loginCtrl.$inject = ['$rootScope', '$scope', '$state', 'Phonebook.user'];

    angular.module('Phonebook')
        .controller('Phonebook.loginCtrl', loginCtrl);
})();