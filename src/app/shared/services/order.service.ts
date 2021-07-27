import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order:any) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

   getOrders() {
    return this.db.list('/orders');
  } 

  getOrdersByUser(userId: string){
    const ordersRef = this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
    return ordersRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }))
    }))
  }
   getOrderbyID(orderId: string, userId: string)
  {
    return this.db.object('/orders/' + orderId).snapshotChanges()
    .pipe(map((order:any) => {
      if(order.payload.exists() && userId === order.payload.val().userId)
      {
        const data = order.payload.val();
        const key = order.payload.key;
        return {key, ...data};}

        else{
          return null
        }
      }
    ));
  }
}
