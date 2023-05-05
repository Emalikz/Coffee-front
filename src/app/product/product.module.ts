import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ListComponent } from './components/list/list.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    ProductComponent,
    ListComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  bootstrap: [ProductComponent]
})
export class ProductModule { }
