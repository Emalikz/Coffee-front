import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment.development';
import { StorageService } from 'src/app/services/storage.service';
import { Sell } from '../types/Sell';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient, private _storage:StorageService) { }

  public getAll():Observable<Product[]>{

    return this._http.get(`${environment.api_url}/products`,{
      headers: new HttpHeaders({'Authorization': `Bearer ${this._storage.get("token")}`})
    }).pipe(
      map((resp:any)=>{
        return resp.data as Product[];
      })
    );
  }

  save(product:Product){
    if(product.id){
      const id = product.id;
      delete product.id;
      return this._http.put(`${environment.api_url}/products/${id}`,product,{
        headers: new HttpHeaders({'Authorization': `Bearer ${this._storage.get("token")}`})
      });
    }
    return this._http.post(`${environment.api_url}/products`,product,{
      headers: new HttpHeaders({'Authorization': `Bearer ${this._storage.get("token")}`})
    })
  }

  delete(id:number){
    return this._http.delete(`${environment.api_url}/products/${id}`,{
      headers: new HttpHeaders({'Authorization': `Bearer ${this._storage.get("token")}`})
    });
  }


  sell(data: Sell){
    return this._http.post(`${environment.api_url}/sell`,data,{
      headers: new HttpHeaders({'Authorization': `Bearer ${this._storage.get("token")}`})
    })
  }


}
