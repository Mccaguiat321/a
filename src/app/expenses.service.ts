import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = 'http://localhost:3000'; // Ensure the base URL points to your API

  constructor(private http: HttpClient) {}

  // Method to get titles
  getTitles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/titles`);
  }
// Add this method to ExpensesService
// Update the method in ExpensesService
getTotalExpenses(titleId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/sum?titleId=${titleId}`); // Include titleId in the query
}

  // Method to get expenses by title ID
  getExpensesByTitleId(titleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/expenses/${titleId}`);
  }
  // expenses.service.ts
  getTotalExpensesByTitleId(titleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sums?titleId=${titleId}`); // Make sure to pass titleId
  }
  

  // Method to add a new title
  addTitle(title: { Title_of_expenses: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert`, title); // Adjust the endpoint accordingly
  }

  // Method to add a new expense
  addExpense(expense: { t_id: number; name_of_expenses: string; price: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_expenses`, expense); // Adjust the endpoint accordingly
  }

  updateTitle(id: number, updatedTitle: { Title_of_expenses: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, updatedTitle);
  }

  // Method to delete a title by ID
  deleteTitle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
