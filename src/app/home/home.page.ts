import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';
import { AddTitleModalComponent } from '../add-title-modal/add-title-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  titles: any[] = []; // Array to hold titles and their total expenses
  selectedExpenses: any[] = []; // Array to hold expenses for the selected title
  selectedTitle: string = ''; // Variable to hold the selected title name
  titleId!: number; // Use non-null assertion
  expenses: any[] = [];
  titleName: string = '';

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Fetch titles from the service on component initialization
    this.loadTitles();
  }

  loadTitles() {
    this.expensesService.getTitles().subscribe((data) => {
      this.titles = data; // Assign fetched titles to the titles array
      this.loadTotalExpenses(); // Load total expenses for each title
    });
  }

  loadTotalExpenses() {
    this.titles.forEach(title => {
      this.expensesService.getTotalExpensesByTitleId(title.id).subscribe(response => {
        title.total_price = response.total_price || 0; // Assign total price to each title
      }, error => {
        console.error('Error fetching total expenses for title:', error);
        title.total_price = 0; // Default to 0 in case of an error
      });
    });
  }

  onSelectTitle(title: any) {
    // Navigate to the expenses page, passing the title ID as a parameter
    this.router.navigate(['/expenses', title.id]);
  }

  async openAddTitleModal() {
    const modal = await this.modalController.create({
      component: AddTitleModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Add the new title to the titles array using the returned data
        this.titles.push({
          id: result.data.id, // Use the inserted ID returned from the server
          Title_of_expenses: result.data.Title_of_expenses, // Use the title name
          total_price: 0 // Initialize total price for the new title
        });
      }
    });

    return await modal.present();
  }

  deleteTitle(id: number) {
    this.expensesService.deleteTitle(id).subscribe(
      () => {
        this.titles = this.titles.filter((title) => title.id !== id); // Remove the deleted title from the array
      },
      (error) => console.error('Error deleting title:', error)
    );
  }

  async openUpdateTitleModal(title: any) {
    const modal = await this.modalController.create({
      component: AddTitleModalComponent,
      componentProps: { title }, // Pass the current title data to the modal
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const updatedTitle = result.data; // Get the updated title data from the modal
        this.expensesService.updateTitle(title.id, updatedTitle).subscribe(
          () => {
            const index = this.titles.findIndex((t) => t.id === title.id);
            if (index > -1) {
              this.titles[index] = { ...this.titles[index], ...updatedTitle }; // Update the title in the array
              this.loadTotalExpenses(); // Reload total expenses after updating
            }
          },
          (error) => console.error('Error updating title:', error)
        );
      }
    });

    return await modal.present();
  }

  loadExpenses() {
    this.expensesService.getTotalExpensesByTitleId(this.titleId).subscribe((data) => {
      this.expenses = data;
      if (data.length > 0) {
        this.titleName = data[0].Title_of_expenses; // Assuming Title_of_expenses is available in each expense
      }
    }, (error) => {
      console.error('Error fetching expenses:', error); // Added error handling
    });
  }
}
