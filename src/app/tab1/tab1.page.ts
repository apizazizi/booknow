import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  books: Observable<any[]>;

  constructor(
    private productService: BookService,
    private menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'main-menu');
    this.menuCtrl.enable(false, 'admin-menu');} 
    

  ngOnInit() {
    this.books= this.productService.getProducts();
  }


  

}

