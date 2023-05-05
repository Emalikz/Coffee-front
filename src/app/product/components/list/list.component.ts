import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { OnInit } from '@angular/core'
import { ProductService } from '../../services/product.service';
import { Product, ProductErrors } from '../../types/Product';
import Swal from 'sweetalert2';
import { Sell, SellErrors } from '../../types/Sell';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private _product:ProductService){

  }

  private _sellErrors: Partial<SellErrors> = {};
  public get sellErrors(): Partial<SellErrors> {
    return this._sellErrors;
  }
  public set sellErrors(value: Partial<SellErrors>) {
    this._sellErrors = value;
  }
  private _errors: Partial<ProductErrors> = {};

  public get errors(): Partial<ProductErrors> {
    return this._errors;
  }
  public set errors(value: Partial<ProductErrors>) {
    this._errors = value;
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
  private _products: Required<Product>[] = [];
  public get products(): Required<Product>[] {
    return this._products;
  }
  public set products(value: Required<Product>[]) {
    this._products = value;
  }

  private _sellForm: Sell = new Sell();
  public get sellForm(): Sell {
    return this._sellForm;
  }
  public set sellForm(value: Sell) {
    this._sellForm = value;
  }

  private _showSellForm: boolean = false;
  public get showSellForm(): boolean {
    return this._showSellForm;
  }
  public set showSellForm(value: boolean) {
    this._showSellForm = value;
  }

  private _mostSold: Product = new Product();
  public get mostSold(): Product {
    return this._mostSold;
  }
  public set mostSold(value: Product) {
    this._mostSold = value;
  }

  private _higherStock: Product = new Product();
  public get higherStock(): Product {
    return this._higherStock;
  }
  public set higherStock(value: Product) {
    this._higherStock = value;
  }


  loadProducts(){
    this._product.getAll().subscribe(prod => {
      this._products  = prod as Required<Product>[];
      this.loadAnalytics();
    })
  }

  loadAnalytics(){
    this._product.higher_stock().subscribe(p=>{
      this.higherStock = p;
    });
    this._product.most_sold().subscribe(p=>{
      this.mostSold = p;
    })
  }

  ngOnInit(): void {

    this.loadProducts();
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
        this.errors = {};
        this.loadProducts();
      }
    },({error})=>{
      this.errors = error.errors;
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
    this.errors = {};
    this.showForm = false;
  }


  sell(i:number){
    this.showSellForm = true;
    const product = this._products.at(i) as Product;
    this.sellForm = new Sell();
    this.sellForm.product = product;
    this.sellForm.product_id = product.id;
  }

  saveSell(){
    this._product.sell(this.sellForm).subscribe(succ=>{
      Swal.fire("Éxito","Se guardó correctamente",'success');
      const product  =this.products.findIndex(product=>product.id == this.sellForm.product_id);
      this.products.at(product)?.sells?.push(this.sellForm);
      this.products[product].stock -= this.sellForm?.amount ?? 0;
      this.sellForm = new Sell();
      this.showSellForm = false;
      this.sellErrors = {};
    },({error})=>{
      this.sellErrors = error.errors;
    })
  }

  cancelSell(){
    this.sellErrors = {};
    this.sellForm = new Sell();
    this.showSellForm = false;
  }
}
