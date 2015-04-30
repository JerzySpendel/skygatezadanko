(function () {
    'use strict';
    function contactsService (api, Contact) {
        var contactsPromise;

        this.getContacts = getContacts;
        this.createContact= createContact;
        this.removeContact = removeContact;

        function getContacts () {
            if(!contactsPromise) {
                contactsPromise = api('contacts').get().then(function (data) {
                    return data.data.contacts.map(function (contact) {
                        return new Contact(contact.name, contact.telephone, contact.address, contact.comment, contact.id);
                    });
                });
            }
            return contactsPromise;
        }

        function createContact (data) {
            contactsPromise = false;
            return api('contacts').post(data).then(function (data) {
                console.log(data);
                return data;
            });
        }

        function removeContact (contact) {
            contactsPromise = false;
            return api('contacts/'+contact.id).delete();
        }
    }
    contactsService.$inject = ['Phonebook.api', 'Phonebook.Contact'];

    angular.module('Phonebook')
        .service('Phonebook.contacts', contactsService);
})();