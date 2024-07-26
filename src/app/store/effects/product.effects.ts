import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/data.service';

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductActions.loadProductsFailure({ error })))
            ))
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            mergeMap(action => this.productService.addProduct(action.product).pipe(
                map(product => ProductActions.addProductSuccess({ product })),
                catchError(error => of(ProductActions.addProductFailure({ error })))
            ))
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap(action => this.productService.updateProduct(action.product.id, action.product).pipe(
                map(product => ProductActions.updateProductSuccess({ product })),
                catchError(error => of(ProductActions.updateProductFailure({ error })))
            ))
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(action => this.productService.deleteProduct(action.id).pipe(
                map(() => ProductActions.deleteProductSuccess({ id: action.id })),
                catchError(error => of(ProductActions.deleteProductFailure({ error })))
            ))
        )
    );

}
