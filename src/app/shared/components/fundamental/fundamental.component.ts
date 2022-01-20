import { Component } from '@angular/core';

export interface ProductFundamental {
  id: string;
  name: string;
  price: number;
  image: string;
}


@Component({
  selector: 'app-fundamental',
  templateUrl: './fundamental.component.html',
  styleUrls: ['./fundamental.component.scss']
})
export class FundamentalComponent {

  names: Array<string> = ['A','B','C','D'];
  name = '';
  widthImg = 10;
  box = {
    width: 100,
    height: 100,
    background: 'red'
  };

  register = {
    name: '',
    email: '',
    password: ''

  };

  constructor() { }

  myProduct =  {
    id: '0',
  name: 'Demo',
  price: 565,
  image: './assets/images/414537.jpg'};

  products: ProductFundamental[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/414537.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/asdf.png'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/ccccccc.png'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/sadfa.png'
    },
    {
      id: '5',
      name: 'Mis librodds',
      price: 363,
      image: './assets/images/savsa.png'
    }
  ];

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.myProduct.name = element.value;
    console.log("object");
  }

  changeName2(event: Event) {
    const element = event.target as HTMLInputElement;
    this.myProduct.name = element.value;
    console.log("object");
  }

  addName(){
    this.names.push(this.name);
    this.name = '';
  }

  delete(index: number, name: string){
    if(confirm("Are you sure to delete " + name)) {
      this.names.splice(index, 1);
    }
  }

  onRegister() {
    console.log(this.register);
  }

}
