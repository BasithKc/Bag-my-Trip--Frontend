import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trip-plan-popup',
  templateUrl: './trip-plan-popup.component.html',
  styleUrls: ['./trip-plan-popup.component.css']
})
export class TripPlanPopupComponent {
  @Output() planSelected = new EventEmitter<{type: string, budget: number[]}>();

  showPopup: boolean = true
  tripTypes = ['family', 'solo', 'couple', 'group']
  budgetRanges = [[10,20], [20,30], [30,40]]
  selectedTripType: string | null = null
  selectedBudget: number[] | null = null

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

  selectBudget(budget: number[]) {
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
