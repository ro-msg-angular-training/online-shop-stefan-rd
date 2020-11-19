import { Address } from './address.model';
import { Location } from './location.model';

export interface Order {
  _id: number;
  shippedFrom: Location;
  createdAt: Date;
  address: Address;
}
