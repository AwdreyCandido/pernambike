export interface IBike {
  id: number;
  createdAt: Date;
  ownerId: string;
  description: string;
  brand: string;
  rim: number;
  timesRented: number;
  isRented: boolean;
  photoUrl: string;
  rentedSince: string;
  price: string;
  title: string;
  reviewsQuantity: number;
  ratingsAvg: number;
}
