import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  titleId!: number; // Use non-null assertion
  expenses: any[] = [];
  titleName: string = '';
  totalExpenses: number = 0; // Variable to hold the total expenses
  newExpenseName: string = ''; // Variable to hold the name of the new expense
  newExpensePrice: number = 0; // Variable to hold the price of the new expense

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.titleId = Number(params.get('titleId'));
      this.loadExpenses(); // Load expenses when titleId changes
      this.loadTotalExpenses(); // Load total expenses
    });
  }

  loadExpenses() {
    this.expensesService.getExpensesByTitleId(this.titleId).subscribe((data) => {
      this.expenses = data;
      if (data.length > 0) {
        this.titleName = data[0].Title_of_expenses; // Assuming Title_of_expenses is available in each expense
      }
    });
  }

  // Method to load total expenses by titleId
  loadTotalExpenses() {
    this.expensesService.getTotalExpenses(this.titleId).subscribe((response) => {
      this.totalExpenses = response.total_price || 0; // Set total or default to 0
    }, (error) => {
      console.error('Error fetching total expenses:', error);
    });
  }

  addExpense() {
    if (this.newExpenseName.trim() && this.newExpensePrice > 0) {
      const newExpense = {
        t_id: this.titleId,
        name_of_expenses: this.newExpenseName,
        price: this.newExpensePrice
      };

      this.expensesService.addExpense(newExpense).subscribe(
        (response) => {
          console.log('Expense added:', response);
          // Reload expenses and total expenses to refresh the display
          this.loadExpenses();
          this.loadTotalExpenses();
        },
        (error) => {
          console.error('Error adding expense:', error);
        }
      );

      // Clear the input fields
      this.newExpenseName = '';
      this.newExpensePrice = 0;
    } else {
      console.error('Please enter a valid name and price for the expense.');
    }
  }
}
