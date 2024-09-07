export interface DriverCurrentOrder {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  driverId: string;
  startDate: string;
  from: string;
  to: string;
}
