import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private menuCtrl:MenuController) {
    this.menuCtrl.enable(false, 'main-menu');
    this.menuCtrl.enable(false, 'admin-menu');
   }

  ngOnInit() {
  }

}
