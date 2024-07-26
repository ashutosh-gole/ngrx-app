import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { Product } from '../../models/product.model';

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