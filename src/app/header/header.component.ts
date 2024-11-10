import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  name = signal('');
  loginService = inject(LoginService);
  router = inject(Router);
  ngOnInit(): void {
    this.loginService.profileName$.subscribe(name => {
      this.name.set(name);
    });
    if(this.loginService.getToken()){
      this.loginService.getProfile().subscribe({
        next: (profile) => {
          if(profile){
            this.loginService.setProfileName(profile.name);
          }
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
        },
      });
    }
  }
  onLogOut(){
    this.loginService.removeToken();
    this.router.navigate(["/login"]);
  }
}
