import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginDTO } from "./login.dto";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private urlLogin = 'https://api.escuelajs.co/api/v1/auth/login';
    private urlGetUser = 'https://api.escuelajs.co/api/v1/auth/profile';
    private profileName = new BehaviorSubject<string>('');
    profileName$ = this.profileName.asObservable();
    private apiConfig = {
        headers: this.createHeaders()
      }
      private createHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json',
        });
      }
    constructor(private http: HttpClient) {}

    login(loginData: LoginDTO):Observable<any>{
        const headers = this.createHeaders();
        return this.http.post(this.urlLogin, loginData, {headers});
    }
    setToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    removeToken() {
      localStorage.removeItem('accessToken');
      this.profileName.next(''); // Clear the profile name on logout
  }
    getToken(): string | null {
      return localStorage.getItem("accessToken");
    }
    getProfile(): Observable<any> {
      const token = this.getToken();
      const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
      return this.http.get<any>(this.urlGetUser, { headers });
    }
    setProfileName(name: string) {
      this.profileName.next(name);
    }
}