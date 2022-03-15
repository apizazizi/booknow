import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { BookService } from '../book.service';
import { take } from 'rxjs/operators';
import { CheckoutPage } from '../checkout/checkout.page';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  @Input() order;
  content: string;
  products = [];
  public subTotal = this.getSubTotal(); //subtotal for all the products
  public total = this.getTotal();
  

  constructor(
    private modalCtrl: ModalController,
    private productService: BookService,
    public authService: AuthService,
    public checkout: CheckoutPage) { }

  ngOnInit() {
    const cartItems = this.productService.cart.value;
      console.log('cart: ', cartItems );
  
  
      this.productService.getProducts().pipe(take(1))
      .subscribe(allProducts => {
        this.products = allProducts.filter(p => cartItems[p.id])
        .map(product => {
          return {...product, count: cartItems[product.id]};
        });
        
        console.log('products: ', this.products);
        // this.productTotal(this.products);


      });
  }


  //get subtotal
  getSubTotal(){
      
    this.subTotal = 0;
    for (let p of this.products){
      this.subTotal += p.price * p.count;
    }
    
    return this.subTotal;
    
  }


  //get total, with tax of 10%
  getTotal(){
    this.total = (this.subTotal + (this.subTotal * (10/100)));
    
    return this.total;
  }


  close(){
    this.modalCtrl.dismiss();
  }


}
