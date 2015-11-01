(function(){	

	angular.module('expenseApp')
		.service('ExpenseService', ['$http', function ($http) {
			var self = this;
			var income = 3085;					

			self.getList = function() {
				return $http.get('http://api.expensio.dev/expense')
					.then(function(response) {						
						return response.data.data;
					});				
			}

			self.create = function(expense) {
				return $http.post('http://api.expensio.dev/expense/create', expense);								
			};

			self.update = function(expense) {
				console.log(1);
				return $http.post('http://api.expensio.dev/expense/' + expense.id, expense);									
			}

			self.destroy = function(expense) {
				return $http.delete('http://api.expensio.dev/expense/' + expense.id);
			};

			self.getIncome = function() {
				return income;				
			};
			
		}]);	
})();