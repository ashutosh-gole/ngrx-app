import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts } from '../store/products/selectors/product.selectors';
import { Product } from '../models/product.model';
import { deleteProduct, loadProducts } from '../store/products/actions/product.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.products$ = this.store.pipe(select(selectAllProducts));
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: { product: {}, isEdit: false }
    });
  }

  editProduct(id: number): void {
    this.products$.subscribe(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        const dialogRef = this.dialog.open(AddProductComponent, {
          width: '400px',
          data: { product, isEdit: true }
        });
      }
    });
  }

  deleteProduct(id: number): void {
    this.store.dispatch(deleteProduct({ id }));
  }

  logout(): void {

  }

}