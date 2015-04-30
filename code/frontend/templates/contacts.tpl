<section class="contacts" layout-sm="column" layout-wrap layout-fill layout-margin>
    <div class="form-wrapper">
        <md-card>
            <md-card-content>
                <h2>Add contact</h2>
                <form name="addingForm">
                    <md-input-container>
                        <label>Name</label>
                        <input type="text" ng-model="newContact.name" required />
                    </md-input-container>
                    <md-input-container>
                        <label>Telephone</label>
                        <input type="text" ng-model="newContact.telephone" required/>
                    </md-input-container>
                    <md-input-container>
                        <label>Address</label>
                        <textarea type="text" ng-model="newContact.address" rows="3" required></textarea>
                    </md-input-container>
                    <md-input-container>
                        <label>Comment</label>
                        <textarea type="text" ng-model="newContact.comment" rows="3" required></textarea>
                    </md-input-container>
                    <div class="actions" layout="row" layout-align="end end">
                        <md-button ng-click="addContact()" class="md-primary" ng-disabled="addingForm.$invalid">Add contact</md-button>
                    </div>
                </form>
            </md-card-content>
        </md-card>
    </div>
    <phonebook-contact ng-repeat="contact in contacts" contact="contact"></phonebook-contact>
</section>
