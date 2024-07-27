import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { productReducer, ProductState } from './product.reducer';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer, RouterReducerState } from '@ngrx/router-store';

export const PRODUCT_KEY = 'products';

export interface State {
  [DEFAULT_ROUTER_FEATURENAME]: RouterReducerState;
  [PRODUCT_KEY]: ProductState;
}

export const reducers: ActionReducerMap<State> = {
  [DEFAULT_ROUTER_FEATURENAME]: routerReducer,
  [PRODUCT_KEY]: productReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
