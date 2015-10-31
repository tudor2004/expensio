(function(){
	var app = angular.module('expenseApp');	

	app.controller('ExpenseController', ['ExpenseModel', function(ExpenseModel){
		var self = this;	

		self.income = ExpenseModel.getIncome();	
		self.expenseList = ExpenseModel.getList();

		self.calcTotal = function() {
			var total = 0;			
			for(var expense in self.expenseList) {
				total += self.expenseList[expense].amount;
			}
			
			self.totalExpense = total;
		};

		self.calcPaid = function() {
			var paid = 0;
			for(var expense in self.expenseList) {
				if(self.expenseList[expense].paid === true) {
					paid += self.expenseList[expense].amount;	
				}				
			}

			self.paidExpense = paid;
		};

		self.addExpense = function() {			
			//console.log(self.expense);
			ExpenseModel.add(angular.copy(self.expense));			

			self.calcTotal();
			self.calcPaid();
		};

		self.removeExpense = function(expense) {			
			ExpenseModel.remove(self.expenseList.indexOf(expense));

			self.calcTotal();
			self.calcPaid();
		}

		self.calcTotal();
		self.calcPaid();		
	}]);

	
})();