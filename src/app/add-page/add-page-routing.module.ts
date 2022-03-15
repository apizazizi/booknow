import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPagePage } from './add-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPagePageRoutingModule {}
