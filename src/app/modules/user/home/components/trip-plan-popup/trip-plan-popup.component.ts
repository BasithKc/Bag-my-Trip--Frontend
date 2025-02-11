import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trip-plan-popup',
  templateUrl: './trip-plan-popup.component.html',
  styleUrls: ['./trip-plan-popup.component.css']
})
export class TripPlanPopupComponent {
  @Output() planSelected = new EventEmitter<{ type: string, budget: string }>();

  showPopup: boolean = false
  tripTypes = ['family', 'solo', 'couple', 'group']
  budgetRanges = ["Below 10k", "10k-20k", "Above 20k"]
  selectedTripType: string | null = null
  selectedBudget: string | null = null

  openPopup() {
    this.showPopup = true
  }

  closePopup () {
    this.resetSelections()
    this.showPopup = false
  }

  selectTripType(type: string) {
    this.selectedTripType = type
  }

  selectBudget(budget: any) {
    this.selectedBudget = budget
  }

  confirmSelection( ) {
    if(this.selectedTripType && this.selectedBudget) {
      this.planSelected.emit({type: this.selectedTripType, budget: this.selectedBudget})
    }
    this.resetSelections()
    this.closePopup()
  }

  private resetSelections( ) {
    this.selectedTripType = null
    this.selectedBudget = null
  }
}
