import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page implements OnInit, AfterViewInit {
  products: Observable<any[]>;

  @ViewChild('myfab', {read: ElementRef}) cartBtn: ElementRef;
  cartAnimation: Animation; 
  cart = {};

  constructor(private productService: BookService, private animationCtrl: AnimationController,
    private modalCtrl: ModalController) {}

  ngOnInit() {
    this.products= this.productService.getProducts();
    
    this.productService.cart.subscribe(value => {
      console.log('MY CART NOW: ', value);
      this.cart = value;
    });
  }
  

  ngAfterViewInit(): void {
      this.cartAnimation = this.animationCtrl.create('cart-animation');
      this.cartAnimation.addElement(this.cartBtn.nativeElement).keyframes([
        { offset:0, transform: 'scale(1)'},
        { offset:0.5, transform: 'scale(1.2)'},
        { offset:0.8, transform: 'scale(0.9)'},
        { offset:1, transform: 'scale(1)'}
      ])
      .duration(300)
      .easing('ease-out');
  }


  addToCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
    this.cartAnimation.play();
  }


  removeFromCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
    this.cartAnimation.play();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage
    });
    await modal.present();
  }
}
