(function(){
    angular.module('expenseApp')
        .controller('LoginController', ['$auth', '$state', '$http', '$rootScope', '$localStorage',
        function($auth, $state, $http, $rootScope, $localStorage) {
            var self = this;

            self.login = function() {
                var credentials = {
                    email: self.email,
                    password: self.password
                };

                $auth.login(credentials).then(function() {
                    return $http.get('http://api.expensio.dev/auth/user');
                }, function(error) {
                    self.loginError = true;
                    self.loginErrorText = error.data.error;
                })
                .then(function(response) {
    				$localStorage.user = response.data.user;
    				$rootScope.authenticated = true;
    				$rootScope.currentUser = response.data.user;
    				$state.go('stack');
                });
            };
        }]);
})();
