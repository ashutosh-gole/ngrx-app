import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { addProduct, updateProduct } from '../store/products/actions/product.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, isEdit: boolean }
  ) {
    this.productForm = this.fb.group({
      title: [data.product?.title || '', Validators.required],
      category: [data.product?.category || '', Validators.required],
      image: [data.product?.image || '', Validators.required],
      description: [data.product?.description || '', Validators.required],
      price: [data.product?.price || '', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        id: this.data.product.id || null,
        title: this.productForm?.controls['title']?.value,
        category: this.productForm?.controls['category']?.value,
        image: this.productForm?.controls['image']?.value,
        description: this.productForm?.controls['description']?.value,
        price: this.productForm?.controls['price']?.value
      };

      if (this.data.isEdit) {
        this.store.dispatch(updateProduct({ product }));
      } else {
        this.store.dispatch(addProduct({ product }));
      }
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}