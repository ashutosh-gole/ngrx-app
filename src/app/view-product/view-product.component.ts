import { Component, OnInit } from '@angular/core';
import { loadProducts } from '../store/actions/product.actions';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { getProduct } from '../store/selectors/product.selectors';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  product$: Observable<Product | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadProducts());
    this.product$ = this.store.pipe(select(getProduct, { id }));
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

}
