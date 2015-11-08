(function(){
    angular.module('expenseApp')
        .factory('FlashService', ['$rootScope', function($rootScope) {
            var service = {};

            var initService = function() {
                $rootScope.$on('$locationChangeStart', function(){
                    clearFlashMessage();
                });

                function clearFlashMessage() {
                    var flash = $rootScope.flash;

                    if(flash) {
                        if(!flash.keepAfterLocationChange) {
                            delete $rootScope.flash;
                        } else {
                            flash.keepAfterLocationChange = false;
                        }
                    }
                }
            };

            service.success = function(message, keepAfterLocationChange) {
                $rootScope.flash = {
                    message: message,
                    type: 'success',
                    keepAfterLocationChange: keepAfterLocationChange
                };
            };

            service.error = function(message, keepAfterLocationChange) {
                $rootScope.flash = {
                    message: message,
                    type: 'error',
                    keepAfterLocationChange: keepAfterLocationChange
                }
            };

            initService();
            return service;
        }]);
})();
