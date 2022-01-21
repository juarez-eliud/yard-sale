import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  /* Para escuchar cambios de un input en especifico 
  la técnica consiste en volverlo un set */
  //@Input() img = '';

  /* Con la ayuda de set se van a escuchar los cambios que hayan 
  en este input, por lo que está función se ejecutará
  cada vez que haya alguna actualiación en el input */
  
  /* Esta regla de linter indica que se toma el nombre que está entre 
  los parentesis('img') para el input, ya que lo recomendable es que
  el nombre del input se tome con el nombre de la variable en este caso changeImg */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img  =>' ,this.img);
    // code
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.w3schools.com/howto/img_nature_wide.jpg';
  counter = 0;
  counterFn: number | undefined;

  constructor() {
    console.log('constructor', 'imgValue =>', this.img);
  }

  /* Actualiza los cambios en los @Inputs del componente, se ejecuta cada vez
  que se existe algún cambio, por lo que los cambios en los inputs se deben
  detectar en este método */
  ngOnChanges(changes: SimpleChanges) { 
    console.log('ngOnChanges', 'imgValue =>', this.img);
    /* Se vuelve una ventaja y desventaja a la vez usar SimpleChanges 
    porque detectaría los cambios de todos los inputs 
    y no se sabría cual en especificó cambió, por lo que si se requiere
    verificar un cambio en especifico se tendrían que evaluar todos los cambios*/
    //Ejemplo: if (changes.) { //code }
    console.log('changes', changes);
  }

  ngOnInit(): void {   
    console.log('ngOnInit', 'imgValue =>', this.img);
    /* setInterval continua corriendo aun cuando el componente se haya 
    eliminado si no se detiene de forma manual, para detenerlo
    se guarda la referencia de la función, en este caso en (counterFn),
    después con la ayuda de clearInterval eliminarlo en el ngOnDestroy */
   /*  this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log('run counter');
    }, 1000); */
  
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    /*Si no se agrega clearInterval el setInterval seguirá corriendo,
    la manera correcta es usando esta función */
    window.clearInterval(this.counterFn);
    /* Se debe de tener en cuenta los eventos que puedan quedar 
   despiertos, por lo tanto el trigger ngOnDestroy puede
   ayudar a matar los eventos y evitar fugas en memoria */
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
   /*  Una vez que se carga la imagen, se dispara el evento (load) 
    desde el template, después se emite la URl de la imagen que cargo */
    //console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
