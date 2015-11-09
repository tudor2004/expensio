(function() {
    var app = angular.module('expenseApp')

    app.controller('DashboardController', ['$auth', '$location', function($auth, $location) {
        var self = this;

        self.title = 'Expense Manager';


        self.logout = function() {

            $location.path('/login');
        }


    }]);
})();
