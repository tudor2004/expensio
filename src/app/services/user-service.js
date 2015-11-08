(function(){
    angular.module('expenseApp')
        .factory('UserService', ['$http', function($http){
            var service = {};

            var handleSuccess = function(response) {
                return response.data;
            }

            var handleError = function(error) {
                return function () {
                    return { success: false, message: error };
                };
            }

            service.getCurrentUser = function() {
                return $http.get('http://api.expensio.dev/auth/user/').then(handleSuccess, handleError('Error getting user by id'));
            };

            return service;
        }]);
})();
