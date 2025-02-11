import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TourApiService } from "../../../services/tour-api/tour-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html'
})

export class EditTourComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  
  editTourForm!: FormGroup
  tourId!: string 
  previewUrl: string | null = null
  existingFeatureImage!: string;
  galleryImages: { preview: string, file?: File }[] = [];
  existingGalleryImages: string[] = [];

  // Form controls for includes/excludes
  includeControl = new FormControl('', Validators.required);
  excludeControl = new FormControl('', Validators.required);

  // Tabs configuration
  tabs = ['Location', 'General', 'Price Settings', 'Information', 'Tour Packages'];
  activeTab = 'Location';

  bookingTabs = ['Hotel Booking', 'Cabin Booking'];
  activeBookingTab = 'Hotel Booking';

  categoriesList: any[] = []

  constructor(
    private tourApiService: TourApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.initializeForm()
  }
  
  ngOnInit(): void {
    this.tourId = this.route.snapshot.params['id']
    this.loadTourData()
    this.loadCategories()
  }

  get categoriesFormArray() {
    return this.editTourForm.get('categories') as FormArray;
  } 

  existTourCategories: string[] = []

   //Function for loading categories
   loadCategories() {    
    this.tourApiService.getTourCategories().subscribe(
      (res) => {
        this.categoriesList = res.categories;
         // Check if we have stored tour categories
      if (this.existTourCategories.length > 0) {
        // Initialize with stored tour categories
        this.initializeCategories(this.existTourCategories);
      } else {
        // If no tour data, initialize all as unchecked
        this.categoriesList.forEach(() => {
          this.categoriesFormArray.push(this.fb.control(false));
        });
      }
      },
      (error) => {
        console.log('Cannot load categories', error);
      }
    );
  }

  initializeForm() {
    this.editTourForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tripType: ['', Validators.required],
      location: ['', Validators.required],
      pricePerPerson: ['', Validators.required],
      duration: ['', Validators.required],
      includes: this.fb.array([]),
      excludes: this.fb.array([]),
      categories: this.fb.array([]),
      hotel: this.fb.array([]),
      cabin: this.fb.array([]),
      itinerary: this.fb.array([])
    })
  }

  loadTourData() {
    this.tourApiService.getTourById(this.tourId).subscribe({
      next: (tourData: any ) =>{     
        this.existTourCategories = tourData.tour.categories   
        //Set simple form controls
        this.editTourForm.patchValue({
          title: tourData.tour.title,
          description: tourData.tour.description,
          tripType: tourData.tour.tripType,
          location: tourData.tour.location,
          pricePerPerson: tourData.tour.pricePerPerson,
          duration: tourData.tour.duration
        });

        // Set feature image if exists
        if (tourData.tour.featureImage) {
          this.existingFeatureImage = tourData.tour.featureImage;
          this.previewUrl = tourData.tour.featureImage;
        }

        // Set gallery images if they exist
        if (tourData.tour.gallery && tourData.tour.gallery.length > 0) {
          this.existingGalleryImages = tourData.tour.gallery;
          this.galleryImages = tourData.tour.gallery.map((url: string) => ({ preview: url }));
          console.log(this.galleryImages)
        }

         // Set includes
         const includesArray = this.editTourForm.get('includes') as FormArray;
         tourData.tour.includes.forEach((item:string) => {
           includesArray.push(this.fb.control(item));
           
         });
 
         // Set excludes
         const excludesArray = this.editTourForm.get('excludes') as FormArray;
         tourData.tour.excludes.forEach((item:string) => {
           excludesArray.push(this.fb.control(item));
         });

         if(this.categoriesList) {
           // Set categories
            this.initializeCategories(tourData.tour.categories)
         }

        // Set hotels
        const hotelArray = this.editTourForm.get('hotel') as FormArray;
        tourData.tour.hotel.forEach((hotel: any) => {
          hotelArray.push(this.createHotelGroup(hotel));
        });

        // Set cabins
        const cabinArray = this.editTourForm.get('cabin') as FormArray;
        tourData.tour.cabin.forEach((cabin: any) => {
          cabinArray.push(this.createCabinGroup(cabin));
        });

        // Set itinerary
        const itineraryArray = this.editTourForm.get('itinerary') as FormArray;
        tourData.tour.itinerary.forEach((day: any) => {
          itineraryArray.push(this.createItineraryDay(day));
        });
      },
      error: (error) => {
        console.error('Error loading tour data:', error);
        // Handle error appropriately
      }
    })
  }

   // Helper methods for form arrays
   private createHotelGroup(hotel: any = {}) {
    return this.fb.group({
      name: [hotel.name || '', Validators.required],
      star: [hotel.star || '', Validators.required],
      price: [hotel.price || '', Validators.required]
    });
  }

  private createCabinGroup(cabin: any = {}) {
    return this.fb.group({
      name: [cabin.name || '', Validators.required],
      price: [cabin.price || '', Validators.required],
      quantity: [cabin.quantity || '', Validators.required]
    });
  }

  private createItineraryDay(day: any = {}) {    
    return this.fb.group({
      title: [day.title || '', Validators.required],
      description: [day.description || '', Validators.required],
      included: [day.included?.join(', ') || ''],
      isDone: [day.isDone || false]
    });
  }

  private initializeCategories(tourCategories: string[]) {    
    const categoriesArray = this.editTourForm.get('categories') as FormArray;
    // Clear the form array first to avoid duplicates
    categoriesArray.clear()
     // Create a control for each category in categoriesList
    this.categoriesList.forEach(category => { 
      // Check if this category's ID exists in tourCategories array
      const isChecked = tourCategories.includes(category._id)
      categoriesArray.push(this.fb.control(isChecked));
      
    });
  }

  // File handling methods
  onFeatureImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        this.previewUrl = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  handleGalleryChange(event: any) {
    const files = event.target.files
    for(let i = 0; i < files.length ; i++){
      const file = files[i]
      const reader = new FileReader()
      reader.onload = () => {
        this.galleryImages.push({
          preview: reader.result as string,
          file: file
        })
      }
      reader.readAsDataURL(file)
    }
  }

  removeGalleryImage(index: number) {
    this.galleryImages.splice(index, 1);
    if (index < this.existingGalleryImages.length) {
      this.existingGalleryImages.splice(index, 1);
    }
  }

  // Function add or remove from includes
  addInclude() {
    if (this.includeControl.valid) {
      this.includes.push(this.fb.control(this.includeControl.value));
      this.includeControl.reset();
    }
  }

  removeInclude(index: number) {
    this.includes.removeAt(index);
  }

  // Function add or remove from excludes
  addExclude() {
    if(this.excludeControl.valid) {
      this.excludes.push(this.fb.control(this.excludeControl.value));
      this.excludeControl.reset()
    }
  }
  removeExclude(index:number) {
    this.excludes.removeAt(index)
  }

  // Hotel
  addHotel() {
    const hotelForm = this.fb.group({
      name: [''],
      star: [0, Validators.max(5)],
      price: [0]
    });
    this.hotelFormArray.push(hotelForm)
  }

  removeHotel(index: number) {
    this.hotelFormArray.removeAt(index)
  }

  // Cabin
  addCabin() {
    const cabinForm = this.fb.group({
      name: [''],
      price: [0], 
      quantity: [0]
    });
    this.cabinFormArray.push(cabinForm)
  }

  removeCabin(index: number) {
    this.cabinFormArray.removeAt(index)
  }

  // Remove day function of itinerary
  removeDay(index: number) {
    this.itineraryFormArray.removeAt(index)
  }
  toggleDay(index:number) {
    const day = this.itineraryFormArray.at(index);
    day.patchValue({isDone: !day.value.isDone})
  }

  // Add day function of itinerary
  addDay() {
    const dayForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      included: [''],
      isDone: [false]
    })

    this.itineraryFormArray.push(dayForm)
  }

  // Open file input
  openFileInput() {
    this.fileInput.nativeElement.click()
  }

  // Remove selected featureImage
  removeImage() {
    this.previewUrl = null
    this.existingFeatureImage = ''
    this.fileInput.nativeElement.value = ''
  }

  // Form submission
   submitTourData() {
    if (this.editTourForm.valid) {
      const formData = new FormData();
      
      // Append form data
      Object.keys(this.editTourForm.value).forEach(key => {
        if (key !== 'categories'  && key !== 'itinerary' && key !== 'hotel' && key !== 'cabin' && key !=='includes' && key !== 'excludes' ) {
          formData.append(key,this.editTourForm.get(key)?.value);
        }
      });
      // Get the includes and excludes from your form
      const includesArray = this.includes.value;
      const excludesArray = this.excludes.value

      // Append each include value separately with the same key name
      includesArray.forEach((value: string) => {
        formData.append('includes[]', value);
      });

      // Append each exclude value separately with the same key name
      excludesArray.forEach((value: string) => {
        formData.append('excludes[]', value);
      });

      // Handle categories
      const selectedCategories = this.categoriesList.filter((_, index) => this.categoriesFormArray.at(index).value)
      .map(category => category._id);
      selectedCategories.forEach(id => {
        formData.append('categories', id)
      });

       // Append hotel, and cabin
       ['hotel', 'cabin'].forEach((arrayName:any) => {
        const formArray = this.editTourForm.get(arrayName) as FormArray;
        formData.append(arrayName, JSON.stringify(formArray.value));
      });

       // Transform and append itinerary
       const itineraryArray = this.editTourForm.get('itinerary') as FormArray;
       const transformedItinerary = itineraryArray.value.map((item:any) => item);
      
      formData.append('itinerary', JSON.stringify(transformedItinerary));

      // Handle feature image
      const featureImageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (featureImageInput?.files?.length) {
        formData.append('featureImage', featureImageInput.files[0]);
      }

      formData.append('existingFeature', this.existingFeatureImage)

      // Handle gallery images
      this.galleryImages.forEach((image, index) => {
        if (image.file) {
          formData.append(`gallery`, image.file);
        }
      });
      formData.append('existingGallery', JSON.stringify(this.existingGalleryImages));
     
      this.tourApiService.updateTour(this.tourId, formData).subscribe(
        response => {
          this.showSuccessAlert()
          this.resetForm()
          
        },
        error => {
          this.showErrorAlert()
        }
      );
    }
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Tour updated successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showErrorAlert() {
     Swal.fire({
        title: 'Error!',
        text: 'Failed to update the tour. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
     });
   }

  resetForm() {
    this.previewUrl = null
    this.galleryImages = []
    this.editTourForm.reset()
  }

   // Tab handling methods
   setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  setActiveBookingTab(tab: string) {
    this.activeBookingTab = tab;
  }

  // Getters for form arrays
  get includes() {
    return this.editTourForm.get('includes') as FormArray;
  }

  get excludes() {
    return this.editTourForm.get('excludes') as FormArray;
  }

  get hotelFormArray() {
    return this.editTourForm.get('hotel') as FormArray;
  }

  get cabinFormArray() {
    return this.editTourForm.get('cabin') as FormArray;
  }

  get itineraryFormArray() {
    return this.editTourForm.get('itinerary') as FormArray;
  }

}