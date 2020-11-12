import { Product } from '../models/product.model';

export class ProductService {
  private products: Array<Product> = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category 1',
      price: 1,
      image: 'Image',
      description: 'Description',
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category 1',
      price: 10,
      image: 'Image',
      description: 'Description',
    },
    {
      id: 3,
      name: 'Product 3',
      category: 'Category 2',
      price: 5,
      image: 'Image',
      description: 'Description',
    },
    {
      id: 4,
      name: 'Product 4',
      category: 'Category 2',
      price: 50,
      image: 'Image',
      description: 'Description',
    },
    {
      id: 5,
      name: 'Product 5',
      category: 'Category 3',
      price: 100,
      image: 'Image',
      description: 'Description',
    },
  ];

  public getProducts(): Array<Product> {
    return this.products;
  }
}
