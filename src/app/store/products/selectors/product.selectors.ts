import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const getProduct = createSelector(
    selectAllProducts,
    (products: Product[], props: { id: number }) => products.find(product => product.id === props.id)
);

export const routeParams = createSelector(
    (state: State) => state.router.state,
    (state) => state.params
);

export const getProductUsingNgrxRouter = createSelector(
    selectAllProducts,
    routeParams,
    (products: Product[], { id }) => {
        return products.filter((product) => product.id === Number(id))[0];
    }
);