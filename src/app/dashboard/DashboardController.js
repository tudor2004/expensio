(function(){
	var app = angular.module('expenseApp');	

	app.controller('DashboardController', [function(){
		var self = this;		
		self.title = 'Expense Manager';
	}]);
})();