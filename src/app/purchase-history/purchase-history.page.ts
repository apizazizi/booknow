import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit {
  public orders : Observable<any[]>;


  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.orders = this.afs.collection('orders', ref => ref.where('user_id', '==', this.authService.userData.uid)).valueChanges()

  }

}
