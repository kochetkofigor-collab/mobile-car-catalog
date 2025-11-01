export interface Landlord {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
  isVerified: boolean;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  pricePerDay: number;
  deposit: number;
  buyoutMonths: number;
  images: string[];
  city: string;
  isNew?: boolean;
  isPromo?: boolean;
  landlord?: Landlord;
  landlordId?: string;
  color?: string;
  plateNumber?: string;
  sts?: string;
  vin?: string;
  isHighlighted?: boolean;
  comingSoonDate?: string;
  rentalOnly?: boolean;
}