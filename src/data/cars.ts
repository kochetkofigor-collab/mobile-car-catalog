export interface Car {
  id: number;
  name: string;
  brand: string;
  year: number;
  pricePerDay: number;
  deposit: number;
  buyoutMonths: number;
  images: string[];
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
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/5386e136-f36a-4a48-a473-9222f8482ad5.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/5386e136-f36a-4a48-a473-9222f8482ad5.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/5386e136-f36a-4a48-a473-9222f8482ad5.jpg'
    ],
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
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/e38d92b8-3346-4e03-809b-d044ae2e80b0.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/e38d92b8-3346-4e03-809b-d044ae2e80b0.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/e38d92b8-3346-4e03-809b-d044ae2e80b0.jpg'
    ],
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
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/a95b7a25-700d-4073-bc8e-6034f5e34787.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/a95b7a25-700d-4073-bc8e-6034f5e34787.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/a95b7a25-700d-4073-bc8e-6034f5e34787.jpg'
    ],
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
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/5386e136-f36a-4a48-a473-9222f8482ad5.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/5386e136-f36a-4a48-a473-9222f8482ad5.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/5386e136-f36a-4a48-a473-9222f8482ad5.jpg'
    ]
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
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/e38d92b8-3346-4e03-809b-d044ae2e80b0.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/e38d92b8-3346-4e03-809b-d044ae2e80b0.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/e38d92b8-3346-4e03-809b-d044ae2e80b0.jpg'
    ]
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
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/a95b7a25-700d-4073-bc8e-6034f5e34787.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/a95b7a25-700d-4073-bc8e-6034f5e34787.jpg',
      'https://cdn.poehali.dev/projects/d7cbc075-8687-4e85-bb35-1036d3264565/files/a95b7a25-700d-4073-bc8e-6034f5e34787.jpg'
    ]
  }
];
