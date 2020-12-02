import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { Output, EventEmitter } from '@angular/core';

interface ValidationError {
  invalidValue: {
    value: any;
    errorMessage: string;
  };
}

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Input() disableId: boolean;
  formValidationErrors: string = '';
  productForm: FormGroup;
  @Output() changedProductEvent = new EventEmitter<Product | undefined>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  positiveIntegerValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationError | null => {
      const value = Number(control.value);
      if (Number.isInteger(value) && value > 0) {
        return null;
      } else {
        return {
          invalidValue: {
            value: control.value,
            errorMessage: errorMessage,
          },
        };
      }
    };
  }

  positiveFloatValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationError | null => {
      const value = Number(control.value);
      if (!Number.isNaN(value) && value > 0) {
        return null;
      } else {
        return {
          invalidValue: {
            value: control.value,
            errorMessage: errorMessage,
          },
        };
      }
    };
  }

  requiredStringValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationError | null => {
      const value = control.value;
      if (!!value) {
        return null;
      } else {
        return {
          invalidValue: {
            value: control.value,
            errorMessage: errorMessage,
          },
        };
      }
    };
  }

  onSave(): void {
    console.log(this.productForm.controls);
    const changedProduct: Product = {
      _id: Number(this.productForm.value.id),
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      weight: Number(this.productForm.value.weight),
      price: Number(this.productForm.value.price),
      category: {
        _id: Number(this.productForm.value.categoryId),
      },
    };
    this.changedProductEvent.emit(changedProduct);
  }

  onCancel(): void {
    this.changedProductEvent.emit(undefined);
  }

  buildFormGroup(): void {
    this.productForm = this.formBuilder.group({
      id: [
        { value: this.product._id, disabled: this.disableId },
        [
          this.positiveIntegerValidator(
            'Product ID must be a positive integer greater than 0!'
          ),
        ],
      ],
      name: [
        this.product.name,
        this.requiredStringValidator('Name cannot be empty!'),
      ],
      price: [
        this.product.price,
        [
          this.positiveFloatValidator(
            'Price must be a positive number greater than 0!'
          ),
        ],
      ],
      weight: [
        this.product.weight,
        [
          this.positiveFloatValidator(
            'Weight must be a positive number greater than 0!'
          ),
        ],
      ],
      description: [
        this.product.description,
        [this.requiredStringValidator('Description cannot be empty!')],
      ],
      categoryId: [
        this.product.category._id,
        [
          this.positiveIntegerValidator(
            'Category ID must be a positive integer greater than 0!'
          ),
        ],
      ],
    });
  }
}
