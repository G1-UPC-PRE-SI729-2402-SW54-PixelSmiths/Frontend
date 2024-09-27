export type VehicleType = {
  brand: string;
  model: string;
  price: string;
  plate: string;
  color: string;
  images: string[];
  id: string;
};

export class Vehicle {
  props: Vehicle;
  constructor(props: Vehicle) {
    this.props = props;
  }
}
