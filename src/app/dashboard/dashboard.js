(function() {
    var app = angular.module('expenseApp')

    app.controller('DashboardController', ['AuthenticationService', '$location', function(AuthenticationService, $location) {
        var self = this;

        self.title = 'Expense Manager';
        self.authService = AuthenticationService;

        self.logout = function() {
            AuthenticationService.logout();
            $location.path('/login');
        }

        AuthenticationService.getCurrentUser();
    }]);
})();
