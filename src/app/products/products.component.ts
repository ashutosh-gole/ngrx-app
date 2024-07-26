import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts } from '../store/selectors/product.selectors';
import { Product } from '../models/product.model';
import { deleteProduct, loadProducts } from '../store/actions/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.products$ = this.store.pipe(select(selectAllProducts));
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(loadProducts());
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    // Implement edit logic here
  }

  deleteProduct(id: number): void {
    this.store.dispatch(deleteProduct({ id }));
  }

}