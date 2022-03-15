import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {
  public orders : Observable<any[]>;
  public ToShip : Observable<any[]>;
  public ToReceive : Observable<any[]>;

  constructor(private afs: AngularFirestore,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.orders = this.afs.collection('orders').valueChanges( );
    console.log(this.orders)
    

    this.getToShipOrders();
    this.getToReceiveOrders();
  }
  getToShipOrders(){
    const queryObservable = this.orders.pipe(
      switchMap(() => 
        this.ToShip = this.afs.collection('orders', ref => ref.where('order_status', '==', 'To ship')).valueChanges()
      
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
        this.ToReceive = this.afs.collection('orders', ref => ref.where('order_status', '==', 'To receive')).valueChanges()
      
        )
    );

    // subscribe to changes
    queryObservable.subscribe(data => {
    console.log("to ship items:", data);  
    
    });
  }


  async changeStatus(id:string){
    this.alertCtrl.create({
      header: 'CHANGE STATUS',
      message: 'Change status to "To receive"?',
      buttons: [  
        {
          text: 'Change status',
          handler: async () => {
            await this.afs.collection('orders').doc(id).update({
              order_status:"To receive"
            });
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
