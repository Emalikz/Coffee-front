import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { OnInit } from '@angular/core'
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/Product';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private _product:ProductService){

  }

  private _showForm: boolean = false;
  public get showForm(): boolean {
    return this._showForm;
  }
  public set showForm(value: boolean) {
    this._showForm = value;
  }

  private _productM: Product = new Product();
  public get productM(): Product {
    return this._productM;
  }
  public set productM(value: Product) {
    this._productM = value;
  }
  private _products: Product[] = [];
  public get products(): Product[] {
    return this._products;
  }
  public set products(value: Product[]) {
    this._products = value;
  }

  loadProducts(){
    this._product.getAll().subscribe(prod => {
      this._products  = prod;
    })
  }

  ngOnInit(): void {

    this.loadProducts()
  }
  showEditForm(p:Product){
    this.showForm = true;
    console.log(p)
    this.productM = p;
  }

  create(){
    this.showForm = true;
    this.productM = new Product();
  }

  save(){
    this._product.save(this.productM).subscribe(success=>{
      console.log(success)
      Swal.fire("Éxito","Se guardó correctamente",'success');
      if(this.productM?.id == null){
        this._productM = new Product();
        this.showForm = false;
        this.loadProducts();
      }
    });
  }

  async delete(index:number ){
    const id = this._products[index].id || 1;
    const { value, dismiss } = await Swal.fire({
      showCancelButton:true,
      cancelButtonText: 'No, cancelar',
      confirmButtonText: 'Si, eliminar',
      title: 'Seguro deseas eliminar este producto?',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false
    })

    if(value){
      this._product.delete(id).subscribe(s=>{
        this._products.splice(index,1);
        Swal.fire("Éxito","Se borró correctamente",'success');
      })
    }
  }

  cancel(){
    this.productM = new Product();
    this.showForm = false;
  }
}
