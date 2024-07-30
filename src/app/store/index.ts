import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { productReducer, ProductState } from './products/reducers/product.reducer';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { debugReducer, logoutReducer } from './app/reducers/app.reducers';

export const PRODUCT_KEY = 'products';

export interface State {
  [DEFAULT_ROUTER_FEATURENAME]: RouterReducerState<any>;
  [PRODUCT_KEY]: ProductState;
}

export const reducers: ActionReducerMap<State> = {
  [DEFAULT_ROUTER_FEATURENAME]: routerReducer,
  [PRODUCT_KEY]: productReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [debugReducer, logoutReducer] : [logoutReducer];
