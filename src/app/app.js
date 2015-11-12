(function() {
    angular.module('expenseApp', ['ui.router', 'satellizer', 'ngStorage'])
        .config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider',
            function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
                $authProvider.loginUrl = 'http://api.expensio.dev/auth/login';
                
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


            }
        ])
        .run(['$rootScope', '$state', '$localStorage', '$auth', function($rootScope, $state, $localStorage, $auth) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                if(toState.name !== 'login' && !$auth.isAuthenticated()) {
                    event.preventDefault();
                    $state.go('login');
                }

                if($localStorage.user && $auth.isAuthenticated()) {
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = $localStorage.user;
                    if (toState.name === "login") {
                        event.preventDefault();
                        $state.go('stack');
                    }
                }
            });
        }]);
})();
