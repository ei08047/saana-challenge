import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule }              from './auth/auth.module';
import { PrivateModule }              from './private/private.module';
import { Router } from '@angular/router';
import { EnvServiceProvider } from './env.service.provider';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule
  ],

  providers: [EnvServiceProvider,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {}

 }
