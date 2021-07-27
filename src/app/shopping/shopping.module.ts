import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccesComponent } from './components/order-succes/order-succes.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent
  ],
  imports: [
   
    SharedModule,

    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
    
      {path: 'check-out', component: CheckOutComponent, canActivate: [ AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccesComponent, canActivate: [ AuthGuard]},
      {path: 'my/orders', component:MyOrdersComponent,canActivate: [ AuthGuard]},
      

    ])
  ]
})
export class ShoppingModule { }
