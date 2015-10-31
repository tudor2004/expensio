(function(){
	angular.module('expenseApp')
		.service('ExpenseModel', function ExpenseModel() {
			var self = this;
			var income = 3085;
			

			self.getList = function() {
				return self.expenseList;
			}

			self.add = function(expense) {
				console.log();
				self.expenseList.push(expense);
			};

			self.remove = function(index) {
				self.expenseList.splice(index, 1);
			};

			self.getIncome = function() {
				return income;				
			};

			self.loadExpenseList = function() {
				return [
					{name: 'Expense 1', amount: 480, paid: false},
					{name: 'Expense 2', amount: 40, paid: false},
					{name: 'Expense 3', amount: 17.5, paid: true},
					{name: 'Expense 4', amount: 24.95, paid: false},
				];
			};

			self.expenseList = self.loadExpenseList();

		});
})();