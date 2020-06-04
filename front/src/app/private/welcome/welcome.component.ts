import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { EnvService } from '../../env.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
	logoutSubmission;
  dummyData;
	constructor(
  private http: HttpClient,
  private router: Router,
  private cookieService:CookieService,
  private env: EnvService
  ) { }
	logoutForm:FormGroup;

	 ngOnInit(): void {
    this.logoutForm = new FormGroup({});

        this.http.get<any>(this.env.apiUrl +'/dummy', { withCredentials: true ,headers: {
        'Content-Type':'application/json',
          }} ).subscribe(data => {
          console.log("data:",data);
          this.dummyData = data.data;
        })
    }


  onSubmit() {
        this.http.get<any>(this.env.apiUrl + '/logout', { withCredentials: true ,headers: {
        'Content-Type':'application/json',
          }} ).subscribe(data => {
        	console.log("data:",data)
            this.logoutSubmission = data;
            console.log(this.cookieService.check('sailsjwt'));
            this.cookieService.delete('sailsjwt');
        })
        this.router.navigate(['landing']);

};

}
