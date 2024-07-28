import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataService } from '../../../services/data/data.service';

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.dataService.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductActions.loadProductsFailure({ error })))
            ))
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            mergeMap(action => this.dataService.addProduct(action.product).pipe(
                map(product => ProductActions.addProductSuccess({ product })),
                catchError(error => of(ProductActions.addProductFailure({ error })))
            ))
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap(action => this.dataService.updateProduct(action.product.id, action.product).pipe(
                map(product => ProductActions.updateProductSuccess({ product })),
                catchError(error => of(ProductActions.updateProductFailure({ error })))
            ))
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(action => this.dataService.deleteProduct(action.id).pipe(
                map(() => ProductActions.deleteProductSuccess({ id: action.id })),
                catchError(error => of(ProductActions.deleteProductFailure({ error })))
            ))
        )
    );

}
