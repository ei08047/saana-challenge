import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvService } from '../../env.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
	loginSubmission;
	constructor(
  private http: HttpClient,
  private router: Router,
  private env: EnvService
  ) { }
    login = { email: '', password: '' };
	loginForm:FormGroup;

	 ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(this.login.email, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.login.password, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.loginForm.value);
          // Simple POST request with a JSON body and response type <any>
    let options = {  withCredentials: true };
        this.http.post<any>(this.env.apiUrl + '/login', { email: this.loginForm.value.email ,password:this.loginForm.value.password, _csrf: this.env.csrf},options).subscribe(data => {
        	console.log("data:",data)
            this.loginSubmission = data;
            this.router.navigate(['/welcome']);
        })
};

get email() { return this.loginForm.get('email'); }
get password() { return this.loginForm.get('password'); }

}
