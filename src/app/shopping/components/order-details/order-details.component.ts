import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit,OnDestroy {
  idOrder:any;
  order$:any;
  quantity = 0;
  orderTotal= 0;
  order:any = {};
  subscription:Subscription

  constructor(private route:ActivatedRoute, private orderService:OrderService,
    private authService: AuthService) 
  {
   this.idOrder = this.route.snapshot.paramMap.get('id');
   }

   async ngOnInit() {
//    this.order$= await this.authService.user$.pipe(switchMap( (user:any) => {
//     return this.orderService.getOrderbyID(this.idOrder, user?.uid);}));

//     this.subscription = this.order$.subscribe((o:any )  => {
//       if(!o){
//       return null;
//       }
//     this.order = o;
//     o.items.forEach((x:any) => {
//       this.orderTotal += x.totalPrice;
//       this.quantity += x.quantity;

//     });
//    })

   }
  
  ngOnDestroy(){
//    this.subscription.unsubscribe();
  }
 }
