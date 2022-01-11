import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDto } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent   {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  //Se implementa con set para detectar cambios en productId de forma dinamica
  @Input() set productId(id: string | null){
    if(id) {
      this.onShowDetail(id);
    }
  }



  @Output() loadMore = new EventEmitter();
  showProductDetail = false;

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };


  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }



  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
  
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    //Si está cerrada la venana de detalle entonces se abre
    if(!this.showProductDetail) {
      this.showProductDetail =  true;
    }
    this.productsService.getProduct(id)
      .subscribe(data => {        
        this.productChosen = data;
        console.log('product', data);
        this.statusDetail = 'success';
      }, error => {
        console.log(error);
        this.statusDetail = 'error';
      });
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => {
        return this.productsService.update(id, {title: 'change'})
      })
      /* Se pueden ir anidando más peticiones, donde la respuesta de una
      otorga el valor para la siguiente pertición, ejemplo: */
      //switchMap((product) => this.productsService.update(id, {title: 'change1'}) ),
      //switchMap((product) => this.productsService.update(id, {title: 'change2'}) )
    ) 
    //Una vez que se terminó la ejecución se obtiene el resultado final en data 
    .subscribe(data => {
      console.log(data);
    });

    this.productsService.fetchReadAndUpdate(id, {title: 'new'})
    .subscribe( response => {
      const read = response[0];
      const update = response[1];
    });
 
  }

  createNewProduct () {
    const product: CreateProductDTO = {
      title: 'nuevo producto',
      description: 'bla bla bla',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 2
    }
    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
        console.log('created',data);
      });
    
  }

  upateProduct() {
    const changes: UpdateProductDto = {
      title: 'Nuevo título'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      console.log('Updated', data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.slice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  


}
