(function() {
    var app = angular.module('expenseApp')

    app.controller('DashboardController', ['$auth', '$state', '$rootScope', '$localStorage', function($auth, $state, $rootScope, $localStorage) {
        var self = this;
        self.title = 'Expense Manager';

        self.logout = function() {            
            $auth.logout().then(function(){
                delete $localStorage.user;
                $rootScope.authenticated = false;
                delete $rootScope.currentUser;
                $state.go('login');
            });
        }

    }]);
})();
