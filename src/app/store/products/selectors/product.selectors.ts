import { createFeatureSelector, createSelector, createSelectorFactory, defaultMemoize } from '@ngrx/store';
import { Product } from '../../../models/product.model';
import { ProductState } from '../reducers/product.reducer';
import { State } from '../..';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);

export const selectProductError = createSelector(
    selectProductState,
    (state: ProductState) => state.error
);

//  method 1
export const getProductOld = createSelector(
    selectAllProducts,
    (products: Product[], props: { id: number }) => products.find(product => product.id === props.id)
);

//  method 2
export const getProduct = (id: number) => createSelector(
    selectAllProducts,
    (products: Product[]) => products.find(product => product.id === id)
);

//  method 3 above method 1 deprecated so new method in angular 18 & ngrx 18
export const getProductById = createSelectorFactory(defaultMemoize)(
    selectAllProducts,
    (products: Product[], props: { id: number }) => products.find(product => product.id === props.id)
);

export const routeParams = createSelector(
    (state: State) => state.router.state,
    (state) => state.params
);

//  method 4
export const getProductUsingNgrxRouter = createSelector(
    selectAllProducts,
    routeParams,
    (products: Product[], { id }) => {
        return products.filter((product) => product.id === Number(id))[0];
    }
);