import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './header/header.component';
import { BookviewComponent } from './bookview/bookview.component';
import { BookcardComponent } from './bookcard/bookcard.component';
import { AddbookComponent } from './addbook/addbook.component';
import { EditbookComponent } from './editbook/editbook.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';

import { NgxTypeaheadModule } from 'ngx-typeahead';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookviewComponent,
    HomeComponent,
    BookcardComponent,
    AddbookComponent,
    EditbookComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
	NgxTypeaheadModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA7aryB77o8tq10AFLGswT9fQHDhucfgho",
      authDomain: "pick-for-me-6c9bf.firebaseapp.com",
      databaseURL: "https://pick-for-me-6c9bf-default-rtdb.firebaseio.com",
      projectId: "pick-for-me-6c9bf",
      storageBucket: "pick-for-me-6c9bf.appspot.com",
      messagingSenderId: "945927071899",
      appId: "1:945927071899:web:e3f622437bec488a4d3e3e",
      measurementId: "G-XDCQVGY7XN"
    }),
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    // provideFirebaseApp(() => initializeApp({
    //   apiKey: "AIzaSyA7aryB77o8tq10AFLGswT9fQHDhucfgho",
    //   authDomain: "pick-for-me-6c9bf.firebaseapp.com",
    //   databaseURL: "https://pick-for-me-6c9bf-default-rtdb.firebaseio.com",
    //   projectId: "pick-for-me-6c9bf",
    //   storageBucket: "pick-for-me-6c9bf.appspot.com",
    //   messagingSenderId: "945927071899",
    //   appId: "1:945927071899:web:e3f622437bec488a4d3e3e",
    //   measurementId: "G-XDCQVGY7XN"
    // })),
    // provideFirestore(() => {
    //   const firestore = getFirestore();
    //   return firestore;
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
