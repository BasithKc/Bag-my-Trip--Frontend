import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthServiceService } from "../../services/auth/auth-service.service";
import {  Router } from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  loginForm!: FormGroup
  errorMessage: string = ''

  constructor(
    private fb: FormBuilder, 
    private authService: AuthServiceService,
    private route: Router  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {  
    if(this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        (res) => {
          this.route.navigate(['/admin/dashboard'])
        },
        (error) => {
          this.errorMessage = error.error.message
          console.log(error);
        }
      )  
    }
  }
}