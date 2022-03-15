import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },
  {
  path: 'readmore/:id',
  loadChildren: () => import('./readmore/readmore.module').then( m => m.ReadmorePageModule)
  },
  {
    path: 'readmore',
    loadChildren: () => import('./readmore/readmore.module').then( m => m.ReadmorePageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then( m => m.ReceiptPageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./admin-products/admin-products.module').then( m => m.AdminProductsPageModule)
  },
  {
    path: 'admin-orders',
    loadChildren: () => import('./admin-orders/admin-orders.module').then( m => m.AdminOrdersPageModule)
  },
  {
    path: 'update-page/:id',
    loadChildren: () => import('./update-page/update-page.module').then( m => m.UpdatePagePageModule)
  },
  {
    path: 'add-page',
    loadChildren: () => import('./add-page/add-page.module').then( m => m.AddPagePageModule)
  },
  {
    path: 'purchase-history',
    loadChildren: () => import('./purchase-history/purchase-history.module').then( m => m.PurchaseHistoryPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
