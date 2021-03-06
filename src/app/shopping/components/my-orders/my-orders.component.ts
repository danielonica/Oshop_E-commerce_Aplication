import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {
  orders$:any;
  constructor(private orderService:OrderService,
    private authService:AuthService) {
    this.orders$ = this.authService.user$.pipe(switchMap((u:any) => this.orderService.getOrdersByUser(u.uid)))
   }

  
}
