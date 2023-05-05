import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule

  ],
  bootstrap: [ProductComponent]
})
export class ProductModule { }
