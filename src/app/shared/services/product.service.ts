import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase ) { }

create(product:object) {
  return this.db.list('/products').push(product);
}
getAll() {
  return this.db.list('/products').snapshotChanges()
  .pipe(map(changes => {
    const products = [] as Product[]
    changes.forEach(x => {
      const product:Product  = x.payload.val() as Product;
      product.key = x.key;
      products.push(product);
    })
    return products;
  }
  ));
}

get(productId:any) {
  return this.db.object('/products/' + productId);
}

update(productId:any, product:any) {
  return this.db.object('/products/' + productId).update(product);


}
delete(productId:any)
{
  return this.db.object('/products/' + productId).remove();
}

}

