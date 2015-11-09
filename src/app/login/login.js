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

    				// The user's authenticated state gets flipped to
    				// true so we can now show parts of the UI that rely
    				// on the user being logged in
    				$rootScope.authenticated = true;

    				// Putting the user's data on $rootScope allows
    				// us to access it anywhere across the app
    				$rootScope.currentUser = response.data.user;

    				// Everything worked out so we can now redirect to
    				// the users state to view the data
    				$state.go('stack');
                });
            };
        }]);
})();
