<md-content class="md-padding register md-whiteframe-z1" layout="row" layout-align="center center">
    <div>
        <h1>Register</h1>
        <form name="registerForm">
            <md-input-container>
                <label>Email</label>
                <input type="email" ng-model="email" required/>
            </md-input-container>
            <md-input-container>
                <label>Password</label>
                <input type="password" ng-model="password" required/>
            </md-input-container>
            <div layout="row" layout-align="end center">
                <md-button class="md-primary" ng-click="register()">Register</md-button>
            </div>
            <span ng-if="registrationFailed">Registration failed! Probably given e-mail is already used.</span>
        </form>
    </div>
</md-content>