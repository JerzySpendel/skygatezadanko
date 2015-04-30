<md-content class="md-padding login md-whiteframe-z1" layout="row" layout-align="center center">
    <div>
        <h1>Log in</h1>
        <form name="loginForm">
            <md-input-container>
                <label>Login</label>
                <input type="email" ng-model="username" required/>
            </md-input-container>
            <md-input-container>
                <label>Password</label>
                <input type="password" ng-model="password" required/>
            </md-input-container>
            <div layout="row" layout-align="end center">
                <md-button class="md-primary" ng-click="login()">Login</md-button>
            </div>
            <span ng-if="loginFailed">Login failed!</span>
        </form>
    </div>
</md-content>