import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Observable} from 'rxjs';
import { AngularFirestore} from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  public user: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.afs.collection('users', ref => ref.where('uid', '==', this.authService.userData.uid)).valueChanges()
  }

}
