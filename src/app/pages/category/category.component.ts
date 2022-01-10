import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  limit = 2;
  offset = 0;
  products: Product[] = [];

  categoryId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    //Obtiene el parametro id que se le pase por ruta
    this.route.paramMap.subscribe(params => {
      //El parametro que se le pasa en get debe de ser el mismo
      this.categoryId = params.get('id');
      if(this.categoryId) {
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(data => {
          this.products = data;
        });
      }
    });
  }

  onLoadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {  
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
