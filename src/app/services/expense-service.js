(function(){

	angular.module('expenseApp')
		.service('ExpenseService', ['$http', function ($http) {
			var self = this;

			self.getExpenseList = function(expenseStack) {
				return $http.get('http://api.expensio.dev/expense/' + expenseStack.id)
					.then(function(response) {
						var expenseList = response.data.data;

						angular.forEach(expenseList, function (expense) {
						  expense.amount = parseFloat(expense.amount);
						});

						return expenseList;
					});
			}

            self.getExpenseDetails = function(id) {
                // TODO
            }

			self.createExpense = function(expense) {
				return $http.post('http://api.expensio.dev/expense', expense);
			};

			self.updateExpense = function(expense) {
				return $http.put('http://api.expensio.dev/expense/' + expense.id, expense);
			}

			self.deleteExpense = function(expense) {
				return $http.delete('http://api.expensio.dev/expense/' + expense.id);
			};


            self.getExpenseStackList = function() {
                return $http.get('http://api.expensio.dev/expense/stack')
                    .then(function(response) {
                        return response.data.data;
                    });
            }

            self.getExpenseStackDetails = function(id) {
                return $http.get('http://api.expensio.dev/expense/stack/' + id)
                    .then(function(response) {
                        return response.data.data;
                    });
            }

            self.createExpenseStack = function(expenseStack) {
				return $http.post('http://api.expensio.dev/expense/stack', expenseStack);
			};

            self.updateExpenseStack = function(expenseStack) {
                // TODO
            };

            self.deleteExpenseStack = function(expenseStack) {
				return $http.delete('http://api.expensio.dev/expense/stack/' + expenseStack.id);
			};

		}]);
})();
