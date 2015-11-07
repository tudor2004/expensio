(function(){
	var app = angular.module('expenseApp');

	app.controller('ExpenseStackController', ['ExpenseService', function(ExpenseService){
		var self = this;
        self.newExpenseStack = {
            currency: 'EUR'
        };

        self.showAddForm = false;
        self.expenseStackList = [];
        self.currencyList = ['EUR', 'USD'];

        var getExpenseStackList = function() {
            return ExpenseService.getExpenseStackList()
                .then(function(expenseStackList) {
                    self.expenseStackList = expenseStackList;
                });
        };

        self.createExpenseStack = function() {
			ExpenseService.createExpenseStack(self.newExpenseStack)
				.then(getExpenseStackList)
				.then(function() {
					self.newExpenseStack = {
                        currency: 'EUR'
                    };
				});
		};

        self.deleteExpenseStack = function(expenseStack) {
            ExpenseService.deleteExpenseStack(expenseStack)
                .then(getExpenseStackList);
        }

        getExpenseStackList();
	}]);
})();
