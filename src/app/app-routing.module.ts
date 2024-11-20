import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'expenses/:titleId', // Route for expenses, includes titleId parameter
    loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesPageModule)
  },
  {
    path: 'add-expense/:titleId', // Updated route to include titleId parameter
    loadChildren: () => import('./add-expense/add-expense.module').then(m => m.AddExpensePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
