import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TourApiService } from "../../../services/tour-api/tour-api.service";
import { map, Observable } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tours.component.html'
})


export class AddToursComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>

  previewUrl!: string | null
  addTourForm!: FormGroup
  categoriesList: any[] = [];

  constructor(
    private tourApiService: TourApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCategories()
    this.initForm()
  }

  initForm(): void {
    this.addTourForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tripType: ['', Validators.required],
      categories:this.fb.array([]),
      location: ['', Validators.required],
      pricePerPerson: [0, Validators.required],
      duration: ['', Validators.required],
      itinerary:this.fb.array([]),
      hotel: this.fb.array([]),
      cabin: this.fb.array([]),

    })
  }

  get categoriesFormArray() {
    return this.addTourForm.get('categories') as FormArray;
  } 

  //Function for loading categories
  loadCategories() {
    this.tourApiService.getTourCategories().subscribe(
      (res) => {
        this.categoriesList = res.categories;
        this.categoriesList.forEach(() => {
          this.categoriesFormArray.push(this.fb.control(false));
        });
      },
      (error) => {
        console.log('Cannot load categories', error);
      }
    );
  }

  featureImageFile: File | null = null
//Open choose  file for feature image
  openFileInput() {
    this.fileInput.nativeElement.click()
  }

  //making url to preview image
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if(input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.featureImageFile = file
      const reader= new FileReader()
      reader.onload= (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file)
    }
  }

  //Function to remove selected imge
  removeImage() {
    this.previewUrl = null
    this.featureImageFile = null
    this.fileInput.nativeElement.value = ''
  }

  galleryImage: GalleryPreview[] = []

  handleGalleryChange(event: Event): void {
    const input = event.target as HTMLInputElement
    if(input.files) {
      const files = Array.from(input.files);
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      this.galleryImage = [...this.galleryImage, ...newImages]
    }
  }

  removeGalleryImage(index:number) {
    URL.revokeObjectURL(this.galleryImage[index].preview);
    this.galleryImage.splice(index, 1)
  }

  //tour settings tab
  activeTab = 'Location';

  tabs = [
    'Location', 'General','Price Settings','Information',  'Tour Packages'];
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Itinerary
  get itineraryFormArray () {
    return  this.addTourForm.get('itinerary') as FormArray
  }

  addDay() {
    const dayForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      included: [''],
      isDone: [false]
    })

    this.itineraryFormArray.push(dayForm)
  }

  removeDay(index: number) {
    this.itineraryFormArray.removeAt(index);
  }

  //Function for expand/collapse each day
  toggleDay(index: number) {
    const day = this.itineraryFormArray.at(index);
    day.patchValue({ isDone: !day.value.isDone });
  }


  // Tour Packages
  activeBookingTab : string = 'Hotel Booking'

  bookingTabs = ['Hotel Booking', 'Cabin Booking' ]

  setActiveBookingTab(tab: string) {
    this.activeBookingTab = tab
  }

  // Hotel
  get hotelFormArray(): FormArray {
    return this.addTourForm.get('hotel') as FormArray;
  }

  addHotel() {
    const hotelForm = this.fb.group({
      name: ['', Validators.required],
      star: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    
    this.hotelFormArray.push(hotelForm);
  }

  removeHotel(index: number) {
    this.hotelFormArray.removeAt(index);

  }

  // Cabin methods
  get cabinFormArray(): FormArray {
    return this.addTourForm.get('cabin') as FormArray;
  }

  addCabin() {
    const cabinForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required]
    });
    this.cabinFormArray.push(cabinForm);
  }

  removeCabin(index: number) {
    this.cabinFormArray.removeAt(index);
  }

  submitTourData() {
    if (this.addTourForm.valid) {
      const formData = new FormData();

      // Append basic form fields
      Object.keys(this.addTourForm.value).forEach(key => {
        if (key !== 'categories' && key !== 'itinerary' && key !== 'hotel' && key !== 'cabin') {
          formData.append(key, this.addTourForm.get(key)?.value);
        }
      });

      // Append categories
      const selectedCategoryIds = this.categoriesList
        .filter((_, index) => this.categoriesFormArray.at(index).value)
        .map(category => category._id);
      selectedCategoryIds.forEach(id => {
        formData.append('categories', id);
      });

      // Append hotel, and cabin
      ['hotel', 'cabin'].forEach(arrayName => {
        const formArray = this.addTourForm.get(arrayName) as FormArray;
        formData.append(arrayName, JSON.stringify(formArray.value));
      });

       // Transform and append itinerary
       const itineraryArray = this.addTourForm.get('itinerary') as FormArray;
       const transformedItinerary = itineraryArray.value.map((item:any) => item);
      
      formData.append('itinerary', JSON.stringify(transformedItinerary));

      // Append feature image
      if (this.featureImageFile) {
        formData.append('featureImage', this.featureImageFile, this.featureImageFile.name);
      }

      // Append gallery images
      this.galleryImage.forEach((image, index) => {
        formData.append('gallery', image.file, image.file.name);
      });

      // Send data to backend
      this.tourApiService.createTour(formData).subscribe(
        response => {
          this.showSuccessAlert()
          this.resetForm()
          
        },
        error => {
          this.showErrorAlert()
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Tour added successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showErrorAlert() {
     Swal.fire({
        title: 'Error!',
        text: 'Failed to create the tour. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
     });
   }

  resetForm() {
    this.addTourForm.reset()
  }

}

interface GalleryPreview {
  file: File,
  preview: string
}

interface ItineraryDay {
  title: string;
  description: string;
  included: string;
  isDone: boolean
}

interface HotelData {
  name: string,
  star: number,
  price: number
}

interface CabinData {
  name: string,
  price: number;
  quantity: number;
}

interface TourData {
  title: string;
  description: string;
  categories: string[];
  featureImage: File | null;
  location: string,
  gallery: File[];
  pricePerPerson: number,
  duration: string,
  itinerary: ItineraryDay[];
  hotelBookings: HotelData[];
  cabinBookings: CabinData[];
}