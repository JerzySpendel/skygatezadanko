<md-card>
    <md-card-content>
        <h3>{{contact.name}}</h3>
        <span>{{contact.telephone}}</span><br />
        <pre>{{contact.address}}</pre>
        <pre>{{contact.comment}}</pre>
        <div class="actions" layout="row" layout-align="end center">
            <md-button ng-click="remove()">remove</md-button>
        </div>
    </md-card-content>
</md-card>