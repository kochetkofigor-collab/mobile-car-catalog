export interface Car {
  id: number;
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
}

export const cars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz S-Class',
    brand: 'mercedes',
    year: 2024,
    pricePerDay: 8500,
    deposit: 50000,
    buyoutMonths: 36,
    images: [
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/919e78a9-fb0d-4981-a0b3-e23a40578130.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/919e78a9-fb0d-4981-a0b3-e23a40578130.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/919e78a9-fb0d-4981-a0b3-e23a40578130.jpg'
    ],
    city: 'Москва',
    isNew: true,
    isPromo: true
  },
  {
    id: 2,
    name: 'BMW 7 Series',
    brand: 'bmw',
    year: 2023,
    pricePerDay: 7500,
    deposit: 45000,
    buyoutMonths: 36,
    images: [
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/f2b3e76d-abab-42c4-9e07-b88f1aefe650.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/f2b3e76d-abab-42c4-9e07-b88f1aefe650.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/f2b3e76d-abab-42c4-9e07-b88f1aefe650.jpg'
    ],
    city: 'Москва',
    isNew: true
  },
  {
    id: 3,
    name: 'Audi A8',
    brand: 'audi',
    year: 2023,
    pricePerDay: 7000,
    deposit: 42000,
    buyoutMonths: 36,
    images: [
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/59a7321f-5770-4aba-8a79-f0768baf4a89.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/59a7321f-5770-4aba-8a79-f0768baf4a89.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/59a7321f-5770-4aba-8a79-f0768baf4a89.jpg'
    ],
    city: 'Москва',
    isPromo: true
  },
  {
    id: 4,
    name: 'Mercedes-Benz E-Class',
    brand: 'mercedes',
    year: 2022,
    pricePerDay: 5500,
    deposit: 35000,
    buyoutMonths: 24,
    images: [
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/104e4a89-cfa7-41d6-ab6b-d3ddef38f590.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/104e4a89-cfa7-41d6-ab6b-d3ddef38f590.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/104e4a89-cfa7-41d6-ab6b-d3ddef38f590.jpg'
    ],
    city: 'Москва'
  },
  {
    id: 5,
    name: 'BMW 5 Series',
    brand: 'bmw',
    year: 2022,
    pricePerDay: 5000,
    deposit: 32000,
    buyoutMonths: 24,
    images: [
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/d2152d46-5475-4a5e-989f-e26dd22ee1d3.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/d2152d46-5475-4a5e-989f-e26dd22ee1d3.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/d2152d46-5475-4a5e-989f-e26dd22ee1d3.jpg'
    ],
    city: 'Москва'
  },
  {
    id: 6,
    name: 'Audi A6',
    brand: 'audi',
    year: 2021,
    pricePerDay: 4500,
    deposit: 30000,
    buyoutMonths: 24,
    images: [
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/df5dcf0d-fb2c-466c-a696-7c722b58ee53.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/df5dcf0d-fb2c-466c-a696-7c722b58ee53.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/df5dcf0d-fb2c-466c-a696-7c722b58ee53.jpg'
    ],
    city: 'Москва'
  }
];