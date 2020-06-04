// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class AuthService {
  constructor( private cookieService:CookieService) {}
  public isAuthenticated(): boolean {
    return this.cookieService.check('sailsjwt');
  }
}