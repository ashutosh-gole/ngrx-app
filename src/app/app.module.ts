import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsComponent } from './products/products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MaterialModule } from './material/material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TruncatePipe } from './pipe/truncate/truncate.pipe';
import { ProductEffects } from './store/products/effects/product.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterSerializer } from './serializer/router-serializer';
import { reducers, metaReducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ViewProductComponent,
    AddProductComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([ProductEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
