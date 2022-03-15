import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage implements OnInit {

  books: Observable<any[]>;

  constructor( 
    private productService: BookService,
    private alertCtrl: AlertController,
    private afs: AngularFirestore,) { }

  ngOnInit() {
    this.books= this.productService.getProducts();
  }


  async deleteProduct(id:string){
    this.alertCtrl.create({
      header: 'Confirm Cancellation',
      message: 'Are you sure you want Delete this product?',
      buttons: [  
        {
          text: 'Delete product',
          handler: async () => {
            await this.afs.doc("books/" + id).delete();
          }
        },
        {
          text: 'No',
          handler: () => {
            
          }
        }
      ]
    }).then(res => {
      res.present();
    });

    
  }

}
