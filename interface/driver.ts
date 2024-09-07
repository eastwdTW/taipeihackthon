export interface DriverCurrentOrder {
  id: number;
  customer: {
    name: string;
    phone: string;
  };
  startDate: string;
  from: string;
  to: string;
}
