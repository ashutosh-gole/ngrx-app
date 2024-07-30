import { Component, inject, OnInit } from '@angular/core';
import { loadProducts } from '../store/products/actions/product.actions';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { getProduct, getProductById, getProductUsingNgrxRouter } from '../store/products/selectors/product.selectors';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  // Please check product.effects.ts file for diff selectors method
  // now we used method 4 for fecthing product details

  // method 2
  // product$: Observable<Product>;

  // method 4
  private store = inject(Store);
  product$ = this.store.pipe(select(getProductUsingNgrxRouter));

  constructor(
    // private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // method 2
    // using angular activatedRoute functionality
    // const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    // this.product$ = this.store.select(getProduct(id));

    // or

    // method 4
    // using ngrx router functionality
    // commneted this code and direct assign value to product$ at line:16 ==> Store directly injected in variable at line:15
    // this.product$ = this.store.pipe(select(getProductUsingNgrxRouter));

    // if user refresh the page and products are empty so we need dispatch loadProducts()
    this.store.dispatch(loadProducts());
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

}
