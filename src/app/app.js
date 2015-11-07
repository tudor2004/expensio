
(function() {
	var app = angular.module('expenseApp', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider.when('/', {
                    templateUrl: 'app/expense-stack/expense-stack.html',
                    controller: 'ExpenseStackController as expenseStackCtrl'
                })
                .when('/expense/:id', {
                    templateUrl: 'app/expense/expense.html',
                    controller: 'ExpenseController as expenseCtrl'
                });

            $routeProvider.otherwise({
                    redirectTo: '/'
                });
        });
})();
