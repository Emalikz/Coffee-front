import { Product } from "./Product"

export class Sell{
  id?: number
  sold_by?: number
  product_id?: number

  amount?: number
  created_at?: string
  updated_at?: string
  product?:Product;
}

export type SellErrors = {[Key in keyof Sell]: Array<string>};
