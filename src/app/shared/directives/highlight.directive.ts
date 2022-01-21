import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  //Escucha evento
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = '#11ffeeff';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }

  constructor(
    //Servicio utilizado para manipular el DOM
    private element: ElementRef
  ) {
    //this.element.nativeElement.style.backgroundColor = 'red';
  }

}
