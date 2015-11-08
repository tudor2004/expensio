
(function() {
	var app = angular.module('expenseApp', ['ngRoute', 'ngCookies'])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                    templateUrl: 'app/expense-stack/expense-stack.html',
                    controller: 'ExpenseStackController as expenseStackCtrl'
                })
                .when('/login', {
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController as loginCtrl'
                })
                .when('/expense/:id', {
                    templateUrl: 'app/expense/expense.html',
                    controller: 'ExpenseController as expenseCtrl'
                });

            $routeProvider.otherwise({
                    redirectTo: '/login'
                });
        }])
        .run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
                // keep user logged in after page refresh
                $rootScope.globals = $cookieStore.get('globals') || {};                
                if($rootScope.globals.currentUser) {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    // redirect to login page if not logged in and trying to access a restricted page
                    var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
                    var loggedIn = $rootScope.globals.currentUser;
                    if(restrictedPage && !loggedIn) {
                        $location.path('/login');
                    }
                });
        }]);


})();
