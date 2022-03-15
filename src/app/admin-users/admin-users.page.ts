import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  users : Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private menuCtrl:MenuController) { 
    this.menuCtrl.enable(false, 'main-menu');
    this.menuCtrl.enable(true, 'admin-menu');
  }

  ngOnInit() {
    this.users = this.afs.collection('users').valueChanges( );
  }

  async deleteUser(id:string){
    this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want Delete this user?',
      buttons: [  
        {
          text: 'Delete user',
          handler: async () => {
            await this.afs.doc("users/" + id).delete();
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
