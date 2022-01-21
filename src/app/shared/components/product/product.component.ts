import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  
  /* El nombre de input también se puede especificar dentro de los paréntesis,
  ejemplo: @Input('myProduct'), pero normalmente no se utiliza ya por lo general
  se recibe con el nombre de la variable */
  /* Es importante establecer un estado inicial para evitar errores, sin embargo
  se puede utilizar el operador Non-null assertion operator, el cual se usa para 
  afirmar que el elemento no es null ni undefined y de esta forma no marque un 
  error de que no se están inicializando las variables, ejemplo: @Input() product!: Product;*/
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

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.product.title = element.value;
  }  

}
