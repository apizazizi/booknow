import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  books = [];

  constructor(
    private productService: BookService, 
    private modalCtrl: ModalController) { }



  ngOnInit() {
    const cartItems = this.productService.cart.value;


    this.productService.getProducts().pipe(take(1))
    .subscribe(allProducts => {
      this.books = allProducts.filter(p => cartItems[p.id])
      .map(product => {
        return {...product, count: cartItems[product.id]};
      });

      console.log('products: ', this.books);
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }


  async checkout(){

    const modal = await this.modalCtrl.create({
      component: CheckoutPage
    });
    await modal.present();

    // await alert.present();

  }
}
