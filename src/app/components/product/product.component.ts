import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  //Es importante establecer un estado inicial para evitar errores
  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {id: '0', name: ''},
    description: ''
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDatail() {
    this.showProduct.emit(this.product.id);
  }

  

}
