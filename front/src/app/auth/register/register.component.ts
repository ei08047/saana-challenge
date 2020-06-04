import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvService } from '../../env.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
	registerSubmission;
	constructor(
  private http: HttpClient,
  private router: Router,
  private env: EnvService
  ) { }
    register = { email: '', password: '' };
	registerForm:FormGroup;

	 ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl(this.register.email, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.register.password, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  onSubmit() {

    let options = { withCredentials: true };

    this.http.get<any>( this.env.apiUrl + '/csrfToken',options).subscribe(data => {
      console.log("data:",data)
        this.registerSubmission = data;
        console.log("csrf:",data);
        })


    this.http.post<any>( this.env.apiUrl + '/signup', { email: this.registerForm.value.email ,password:this.registerForm.value.password , _csrf: this.env.csrf },options).subscribe(data => {
    	console.log("data:",data)
        this.registerSubmission = data;
        this.router.navigate(['welcome']);
        })



};

get email() { return this.registerForm.get('email'); }
get password() { return this.registerForm.get('password'); }
}
