(function () {
    'use strict';
    function contactsCtrl ($state, $scope, $timeout, user, contacts) {
        $scope.contacts = [];
        $scope.newContact = {};

        if(!user.isLogged()) {
            $state.go('home');
        }

        $scope.$on('Phonebook.removedContact', fetchContacts);

        fetchContacts();

        $scope.addContact = function () {
            console.log($scope.addingForm);
            if($scope.addingForm.$valid) {
                contacts.createContact($scope.newContact).then(fetchContacts);
                //$scope.newContact = {};
                //$scope.addingForm.$setUntouched();
                $timeout(function () {
                    $scope.newContact = {
                        name: '',
                        comment: '',
                        telephone: '',
                        address: ''
                    };
                    $scope.addingForm.$setPristine();
                }, 10);

            }

        };

        function fetchContacts () {
            contacts.getContacts().then(function (contactList) {
                console.log(contactList);
                $scope.contacts = contactList;
            });
        }

    }
    contactsCtrl.$inject = ['$state', '$scope', '$timeout', 'Phonebook.user', 'Phonebook.contacts'];

    angular.module('Phonebook')
        .controller('Phonebook.contactsCtrl', contactsCtrl);
})();