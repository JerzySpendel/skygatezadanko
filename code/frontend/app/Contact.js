(function () {
    'use strict';
    function contactFactory () {
        return function Contact (name, telephone, address, comment, id) {
            this.name = name;
            this.telephone = telephone;
            this.address = address;
            this.comment = comment;
            this.id = id;
        };
    }

    function contactDirective (contacts) {
        return {
            restrict: 'E',
            templateUrl: 'templates/contact.tpl',
            scope: {
                contact: '='
            },
            link: function (scope) {
                scope.remove = function () {
                    contacts.removeContact(scope.contact).then(function () {
                        scope.$emit('Phonebook.removedContact');
                    });
                }
            }
        }
    }
    contactDirective.$inject = ['Phonebook.contacts'];

    angular.module('Phonebook')
        .factory('Phonebook.Contact', contactFactory)
        .directive('phonebookContact', contactDirective);
})();