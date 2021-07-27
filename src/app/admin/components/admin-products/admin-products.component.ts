import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy,AfterViewInit {
  
  subscription: Subscription;
  displayedColumns = ['title','price', '$key'];
  dataSource= new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService:ProductService) {
    //this.dataSource.filter = this.displayedColumns[0];
   //]] this.dataSource.filterPredicate = (data: Product, filter: string) => !filter || data.title == filter; 
  }

  ngOnInit(): void {
   this.subscription = this.productService.getAll().subscribe(products => {
     this.dataSource.data = products;
   });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
