import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthServiceService } from "../../services/auth-service.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  loginForm!: FormGroup
  errorMessage: string = ''

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {  
    if(this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);        
        },
        (error) => {
          this.errorMessage = error.error.message
          console.log(error);
        }
      )  
    }
  }
}