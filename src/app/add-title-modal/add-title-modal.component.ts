import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-add-title-modal',
  templateUrl: './add-title-modal.component.html',
  styleUrls: ['./add-title-modal.component.scss'],
})
export class AddTitleModalComponent {
  @Input() title: any = { Title_of_expenses: '' }; // Accept the title object as an input

  constructor(
    private modalController: ModalController,
    private expensesService: ExpensesService
  ) {}

  onSubmit() {
    // Check if title.id exists; if so, update the title; otherwise, add a new title
    if (this.title.id) {
      this.expensesService.updateTitle(this.title.id, { Title_of_expenses: this.title.Title_of_expenses }).subscribe(
        (response) => {
          console.log('Title updated:', response);
          this.modalController.dismiss(response); // Pass the updated title back to the HomePage
        },
        (error) => {
          console.error('Error updating title:', error);
        }
      );
    } else {
      this.expensesService.addTitle({ Title_of_expenses: this.title.Title_of_expenses }).subscribe(
        (response) => {
          console.log('Title added:', response);
          // Assuming response contains the new title data, dismiss the modal with the new title
          this.modalController.dismiss({
            id: response.insertId, // Use the returned ID from the response if applicable
            Title_of_expenses: this.title.Title_of_expenses // Include the title name
          });
        },
        (error) => {
          console.error('Error adding title:', error);
        }
      );
    }
  }

  dismiss() {
    this.modalController.dismiss(); // Dismiss the modal without any action
  }
}
