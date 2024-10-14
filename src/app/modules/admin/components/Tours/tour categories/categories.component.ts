import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TourApiService } from "../../../services/tour-api/tour-api.service";
import { CommonModule } from "@angular/common";
import Swal from 'sweetalert2';
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CategoriesComponent implements OnInit{
  tourCategoryForm!: FormGroup
  categories$!: Observable<any[]>;

  constructor(
    private fb:FormBuilder, 
    private tourApiService:TourApiService,
  ) {}

  ngOnInit(): void {
    this.initForm()

    // Get available categories
    this.loadCategories() 
  }

  loadCategories() {
    this.categories$ = this.tourApiService.getTourCategories().pipe(
      map(res => res.categories || [])
    );
  }

  initForm() {
    this.tourCategoryForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.tourCategoryForm.valid){
      this.tourApiService.addTourCategory(this.tourCategoryForm.value)
        .subscribe(
          response => {
            this.showSuccessAlert()
            this.resetForm();
          },
          error => {
            this.showErrorAlert()
            console.error('Error submitting form', error);
          }
        )
    }
  }
  showSuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Tour category added successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showErrorAlert() {
     Swal.fire({
        title: 'Error!',
        text: 'Failed to add the tour category. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
     });
   }

  resetForm() {
    this.tourCategoryForm.reset()
  }
}