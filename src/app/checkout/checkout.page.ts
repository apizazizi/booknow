import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { ToastController } from '@ionic/angular';
import { ReceiptPage } from '../receipt/receipt.page';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})


export class CheckoutPage implements OnInit {


  post = {} as Post;
  products = [];
  productNames = [];
  productImages = [];
  public mapped = [];
  public subTotal = this.getSubTotal(); //subtotal for all the products
  public total = this.getTotal();
  

  constructor(
    private productService: BookService, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }


    ngOnInit() {
      const cartItems = this.productService.cart.value;
      console.log('cart: ', cartItems );
      
      const obj = cartItems;
       this.mapped = Object.keys(obj).map(key => 
        ({item_id:key,
          qty: obj[key]
        })
        );
         

      this.productService.getProducts().pipe(take(1))
      .subscribe(allProducts => {
        this.products = allProducts.filter(p => cartItems[p.id])
        .map(product => {
          return {...product, count: cartItems[product.id]};
        });

        console.log('products: ', this.products);

        
        //get all the product names
        for (let i=0; i < this.products.length; i++){
          this.productNames[i] = this.products[i].name;
        }
        console.log('product names: ', this.productNames);


        //get all product images
        for (let i=0; i < this.products.length; i++){
          this.productImages[i] = this.products[i].image;
        }
        console.log('product image: ', this.productImages);
      });
    }


    close(){
      this.modalCtrl.dismiss();
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
    

    async confirmCheckout(){

      if(this.formValidation()){
      this.productService.checkoutCart(this.post, this.subTotal, this.total, this.productNames, this.productImages, this.mapped);
     
     
      //opens receipt page
      const modal = await this.modalCtrl.create({
      component: ReceiptPage
        });
      await modal.present();
      
      //gives alert
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Thanks for ordering',
        buttons: ['Continue shopping']
        
      });
      await alert.present();

    //if user has not entered their address
    } else {
      this.showToast("Please enter your address");

    }
  }

    //check to see if user has entered their address or not
    formValidation(){
      if (!this.post.address){
        return false;
      }
      return true;
    }


    async cancelCheckout(){
      this.close();
    }




    showToast (message:string){
      this.toastCtrl.create({
      message: message,
      duration: 3000
      })
      .then(toastData => toastData.present());
      }
  }
  