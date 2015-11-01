(function(){
	var app = angular.module('expenseApp');	

	app.controller('ExpenseController', ['ExpenseService', function(ExpenseService){
		var self = this;	

		self.income = ExpenseService.getIncome();	
		self.newExpense = {};
				
		var getList = function() {			
			return ExpenseService.getList()
				.then(function(expenseList) {					
	        		self.expenseList = expenseList;
	        		calcTotal();
					calcPaid();
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

		self.create = function() {						
			ExpenseService.create(self.newExpense)
				.then(getList)
				.then(function() {
					self.newExpense = {};
				});						
		};

		self.delete = function(expense) {						
			ExpenseService.destroy(expense)
				.then(getList);			
		}

		self.update = function(expense) {
			ExpenseService.update(expense)
				.then(getList);
		}		

		getList();						
	}]);

	
})();