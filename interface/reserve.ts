export interface GetAllCar {
  startDate: string;
  from: string;
  to: string;
  carType: CarType;
}

export interface AvailableCarDto {
  driverId: number;
  carType: CarType;
  waitingTime: string;
  price: number;
}

export interface ReserveCarDto {
  startDate: string;
  from: string;
  to: string;
  driverId: number;
}

export enum CarType {
  "無障礙乘車" = "無障礙乘車",
  "敬老愛心計程車" = "敬老愛心計程車",
  "銀髮族運輸服務" = "銀髮族運輸服務",
  "小型復康巴士" = "小型復康巴士",
  "大型復康巴士" = "大型復康巴士",
  "通用計程車" = "通用計程車",
}
