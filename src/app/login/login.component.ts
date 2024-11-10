import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginDTO } from './login.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  loginForm: FormGroup;
  errorMessage = '';
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = new LoginDTO(formData)
      this.loginService.login(loginDTO).subscribe(
        (response) => {
          this.loginService.setToken(response.access_token);
          this.loginService.getProfile().subscribe({
            next: (profile) => {
              this.loginService.setProfileName(profile.name);
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error('Error fetching profile:', error);
            },
          });
        },
        (error) => {
          alert("Thông tin đăng nhập sai!"); 
        }
      );
    }
  }
}
