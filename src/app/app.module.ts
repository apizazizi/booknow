import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CheckoutPage } from './checkout/checkout.page';
import { AngularFireStorageModule,
    AngularFireStorageReference,
    AngularFireUploadTask } from '@angular/fire/compat/storage';
    
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

export const app = firebase.initializeApp(environment.firebaseConfig);

@NgModule({
declarations: [AppComponent],
entryComponents: [],
imports: [
BrowserModule,
IonicModule.forRoot({ swipeBackEnabled: false }),
AppRoutingModule,
AngularFireModule.initializeApp(environment.firebaseConfig),
AngularFireAuthModule,
AngularFirestoreModule,
AngularFireStorageModule,
AngularFireDatabaseModule
],
providers: [CheckoutPage,
{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
],
bootstrap: [AppComponent]
})
export class AppModule {}