import { Product } from '../models/product.model';
import { ProductUpdateDto } from '../DTOs/product-update-dto';
import { ProductSaveDto } from '../dtos/product-save-dto';

export function mapProductToUpdateDto(product: Product): ProductUpdateDto {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    weight: product.weight,
    price: product.price,
    categoryId: product.category._id,
  };
}

export function mapProductToSaveDto(product: Product): ProductSaveDto {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    weight: product.weight,
    price: product.price,
    categoryId: product.category._id,
    supplierId: 1,
  };
}
