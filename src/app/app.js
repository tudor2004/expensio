(function() {
    angular.module('expenseApp', ['ui.router', 'satellizer', 'ngStorage'])
    .config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController as loginCtrl'
            })
            .state('stack', {
                url: '/',
                templateUrl: 'app/expense-stack/expense-stack.html',
                controller: 'ExpenseStackController as expenseStackCtrl'
            })
            .state('expense', {
                url: '/expense/:id',
                templateUrl: 'app/expense/expense.html',
                controller: 'ExpenseController as expenseCtrl'
            });

        // Push the new factory onto the $http interceptor array
        $httpProvider.interceptors.push('AuthenticationInterceptor');

        $authProvider.loginUrl = 'http://api.expensio.dev/auth/login';
    }])
    .run(['$rootScope', '$state', '$localStorage', function($rootScope, $state, $localStorage) {
        // $stateChangeStart is fired whenever the state changes. We can use some parameters
        // such as toState to hook into details about the state as it is changing
        $rootScope.$on('$stateChangeStart', function(event, toState) {

            // Grab the user from local storage and parse it to an object
            var user = $localStorage.user;

            // If there is any user data in local storage then the user is quite
            // likely authenticated. If their token is expired, or if they are
            // otherwise not actually authenticated, they will be redirected to
            // the auth state because of the rejected request anyway
            if(user) {

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app. Here
                // we are grabbing what is in local storage
                $rootScope.currentUser = user;

                // If the user is logged in and we hit the auth route we don't need
                // to stay there and can send the user to the main state
                if(toState.name === "login") {

                    // Preventing the default behavior allows us to use $state.go
                    // to change states
                    event.preventDefault();

                    // go to the "main" state which in our case is users
                    $state.go('stack');
                }
            }
        });
    }]);
})();
