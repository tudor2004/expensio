(function(){
	var app = angular.module('expenseApp');

	app.controller('ExpenseController', ['ExpenseService', '$stateParams', function(ExpenseService, $stateParams){
		var self = this;

        self.expenseStack = {},
		self.income = 0;
		self.orderBy = '-name';
		self.searchKey = '';
		self.newExpense = {};

		var getExpenseList = function(id) {
			return ExpenseService.getExpenseList(self.expenseStack)
				.then(function(expenseList) {
	        		self.expenseList = expenseList;
					self.newExpense = {
                        stackId: self.expenseStack.id
                    };
	        		calcTotal();
					calcPaid();
	  			});
		}

        var getExpenseStackDetails = function(id) {
			return ExpenseService.getExpenseStackDetails(id)
				.then(function(expenseStack) {
	        		self.expenseStack = expenseStack;
                    self.newExpense = {
                        stackId: self.expenseStack.id
                    };

                    self.income = self.expenseStack.income;
	        		getExpenseList();
	  			});
		}

		var calcTotal = function() {
			var total = 0;
			for(var expense in self.expenseList) {
				total += parseFloat(self.expenseList[expense].amount);
			}

			self.totalExpense = total;
		};

		var calcPaid = function() {
			var paid = 0;
			for(var expense in self.expenseList) {
				if(self.expenseList[expense].paid == 1) {
					paid += parseFloat(self.expenseList[expense].amount);
				}
			}

			self.paidExpense = paid;
		};

		self.createExpense = function() {
			ExpenseService.createExpense(self.newExpense)
				.then(getExpenseList)
				.then(function() {
					self.newExpense = {
                        stackId: self.expenseStack.id
                    };
				});
		};

		self.deleteExpense = function(expense) {
			ExpenseService.deleteExpense(expense)
				.then(getExpenseList);
		};

		self.updateExpense = function(expense) {
			ExpenseService.updateExpense(expense)
				.then(getExpenseList);
		};

		self.sort = function(sortKey) {
			var sortDirection = self.orderBy.charAt(0) === '-' ? '+' : '-';
			self.orderBy = sortDirection + sortKey;
		};

		getExpenseStackDetails($stateParams.id);
	}]);
})();
