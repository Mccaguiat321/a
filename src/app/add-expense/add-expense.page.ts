import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage {
  titleId!: number; // To store the title ID
  name_of_expenses: string = ''; // Input for the name of the expense
  price: number | null = null; // Input for the price of the expense

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    // Get the titleId from the route parameters
    this.titleId = Number(this.route.snapshot.paramMap.get('titleId'));
  }

  onSubmit() {
    const expenseData = {
      t_id: this.titleId,
      name_of_expenses: this.name_of_expenses,
      price: this.price !== null ? this.price : 0 // Ensure price is a number
    };
  
    this.expensesService.addExpense(expenseData).subscribe(
      (response) => {
        console.log('Expense added:', response);
        // Navigate back to expenses page with a query parameter to indicate refresh
        this.router.navigate(['/expenses', this.titleId, { refresh: true }]);
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }
  
}
