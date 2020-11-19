import { Address } from './address.model';

export interface Location {
  _id: number;
  name: string;
  address: Address;
}
