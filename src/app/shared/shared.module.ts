import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ImgComponent } from './components/img/img.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { FundamentalComponent } from './components/fundamental/fundamental.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductsComponent,
    ProductComponent,
    ImgComponent,
    FundamentalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FormsModule
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductsComponent,
    ProductComponent,
    ImgComponent
  ]
})
export class SharedModule { }
