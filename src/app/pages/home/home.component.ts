import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 1;
  offset = 0;
  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  } 

  onLoadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      //Para no sobreescribir los elementos, se concatenan para ir agregando los nuevos
     /* Concat es un método de los arrays inmmutable, es decir no modifica el array original,
      por lo que primero se concatena y se vuelva a asignar al arreglo para que haya una 
      modificación y Angular corra la detección de cambios */
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
