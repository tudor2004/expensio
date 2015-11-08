(function() {
    angular.module('expenseApp')
        .factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService',
        function($http, $cookieStore, $rootScope, $timeout, UserService) {
                var service = {};
                service.user = null;

                service.login = function(email, password, callback) {
                    $http.post('http://api.expensio.dev/auth/login', {
                            email: email,
                            password: password
                        })
                        .then(function(response) {
                            callback(response.data);
                        });
                };

                service.setCredentials = function(email, token) {
                        $rootScope.globals = {
                            currentUser: {
                                email: email,
                                token: token
                            }
                        };

                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                        $cookieStore.put('globals', $rootScope.globals);
                        service.getCurrentUser();
                };

                service.getCurrentUser = function() {
                    $http.get('http://api.expensio.dev/auth/user')
                        .then(function(response) {
                            if(response.data.status == 'OK') {
                                service.user = response.data.data;
                            }
                        });
                }
                service.logout = function() {
                    service.user = null;
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    $http.defaults.headers.common.Authorization = 'Basic';
                };


                return service;
        }]);

})();
