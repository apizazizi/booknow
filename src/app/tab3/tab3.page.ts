import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public orders : Observable<any[]>;
  public ToShip : Observable<any[]>;
  public ToReceive : Observable<any[]>;


  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private alertCtrl: AlertController) { 
  }

  ngOnInit() {
    this.orders = this.afs.collection('orders').valueChanges( );
    console.log(this.orders)
    

    this.getToShipOrders();
    this.getToReceiveOrders();
  }


  getToShipOrders(){
    const queryObservable = this.orders.pipe(
      switchMap(() => 
        this.ToShip = this.afs.collection('orders', ref => ref.where('user_id', '==', this.authService.userData.uid).where('order_status', '==', 'To ship')).valueChanges()
      
        )
    );

    // subscribe to changes
    queryObservable.subscribe(data => {
    console.log("to ship items:", data);  
    
    });
  }


  getToReceiveOrders(){
    const queryObservable = this.orders.pipe(
      switchMap(() => 
        this.ToReceive = this.afs.collection('orders', ref => ref.where('user_id', '==', this.authService.userData.uid).where('order_status', '==', 'To receive')).valueChanges()
      
        )
    );

    // subscribe to changes
    queryObservable.subscribe(data => {
    console.log("to ship items:", data);  
    
    });
  }


  async cancelOrder(id:string){
    this.alertCtrl.create({
      header: 'Confirm Cancellation',
      message: 'Are you sure you want cancel this order?',
      buttons: [  
        {
          text: 'Cancel order',
          handler: async () => {
            await this.afs.doc("orders/" + id).delete();
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