import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictComponent } from './components/predict/predict.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { RecognizeComponent } from './components/recognize/recognize.component';
import { AlertComponent } from './components/alert/alert.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';



const router: Routes = [
  { path : '', component : HomeComponent, data: { title: 'Accueil' } },
  { path : 'contact', component : ContactComponent, data: { title: 'Contactez-Nous' } },
  { path : 'recognize', component : RecognizeComponent, data: {title: 'recognize'} },
  { path : 'home', redirectTo : '', pathMatch: 'full', data: { title: 'Accueil' } },
];
@NgModule({
  declarations: [
    AppComponent,
    PredictComponent,
    CartComponent,
    HomeComponent,
    ContactComponent,
    RecognizeComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(router)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
