import { User } from "src/app/types/User";
import { Sell } from "./Sell";

export class Product {
  id?:number;
  product_name?: string;
  reference?: string;
  price?: number;
  weight?: number;
  stock?: number;
  creator?: User;
  sells?:Sell[]

  constructor(){
    this.sells = [];
  }
}


export type ProductErrors = {[Key in keyof Product]: Array<string>};
