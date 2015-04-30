(function () {
    'use strict';
    function topCtrl ($rootScope, $scope, $state, user) {
        $scope.userLogged = false;

        $scope.logout = function () {
            user.logout().success(function () {
                $state.go('home');
                $rootScope.$broadcast('Phonebook.loggedOut');
                $scope.userLogged = false;
            });
        };

        $scope.$on('Phonebook.logged', function () {
            $scope.userLogged = user.getUser();
        });

        user.checkSession().then(function () {
            $scope.userLogged = user.getUser();
            $state.go('contacts');
        });
    }
    topCtrl.$inject = ['$rootScope', '$scope', '$state', 'Phonebook.user'];

    angular.module('Phonebook')
        .controller('Phonebook.topCtrl', topCtrl);
})();