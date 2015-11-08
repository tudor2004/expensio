(function(){
    angular.module('expenseApp')
        .controller('LoginController', ['$location', 'AuthenticationService', 'FlashService',
        function($location, AuthenticationService, FlashService) {
            var self = this;

            var initController = function() {
                AuthenticationService.logout();
            }

            self.login = function() {
                self.dataLoading = true;
                AuthenticationService.login(self.email, self.password, function(response) {
                    if(response.status == 'OK') {
                        AuthenticationService.setCredentials(self.email, response.token);                                                
                        $location.path('/');
                    } else {
                        FlashService.error(response.message);
                        self.dataLoading = false;
                    }
                });
            }

            initController();
        }]);
})();
