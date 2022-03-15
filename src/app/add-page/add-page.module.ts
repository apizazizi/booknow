import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPagePageRoutingModule } from './add-page-routing.module';

import { AddPagePage } from './add-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPagePageRoutingModule
  ],
  declarations: [AddPagePage]
})
export class AddPagePageModule {}
