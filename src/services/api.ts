import type { Car, Landlord } from '@/data/cars';

const API_BASE_URL = 'https://functions.poehali.dev';

const ENDPOINTS = {
  CARS: `${API_BASE_URL}/e47007a1-86f7-427c-b1d7-4027839fd8eb`,
  LANDLORDS: `${API_BASE_URL}/landlords`,
  CITIES: `${API_BASE_URL}/cities`,
  LISTING_REQUESTS: `${API_BASE_URL}/listing-requests`,
};

export const carsService = {
  async getAll(): Promise<Car[]> {
    const response = await fetch(ENDPOINTS.CARS);
    if (!response.ok) throw new Error('Failed to fetch cars');
    return response.json();
  },

  async getById(id: string): Promise<Car | null> {
    const cars = await this.getAll();
    return cars.find(car => car.id === id) || null;
  },

  async getByCity(city: string): Promise<Car[]> {
    const cars = await this.getAll();
    return cars.filter(car => car.city === city);
  },

  async add(car: Partial<Car>): Promise<string> {
    const response = await fetch(ENDPOINTS.CARS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    });
    if (!response.ok) throw new Error('Failed to create car');
    const data = await response.json();
    return data.id;
  },

  async update(id: string, car: Partial<Car>): Promise<void> {
    const response = await fetch(ENDPOINTS.CARS, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...car, id })
    });
    if (!response.ok) throw new Error('Failed to update car');
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${ENDPOINTS.CARS}?id=${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete car');
  }
};

export const landlordsService = {
  async getAll(): Promise<Landlord[]> {
    const response = await fetch(ENDPOINTS.LANDLORDS);
    if (!response.ok) throw new Error('Failed to fetch landlords');
    return response.json();
  },

  async getById(id: string): Promise<Landlord | null> {
    const landlords = await this.getAll();
    return landlords.find(landlord => landlord.id === id) || null;
  },

  async add(landlord: Partial<Landlord>): Promise<string> {
    const response = await fetch(ENDPOINTS.LANDLORDS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(landlord)
    });
    if (!response.ok) throw new Error('Failed to create landlord');
    const data = await response.json();
    return data.id;
  },

  async update(id: string, landlord: Partial<Landlord>): Promise<void> {
    const response = await fetch(ENDPOINTS.LANDLORDS, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...landlord, id })
    });
    if (!response.ok) throw new Error('Failed to update landlord');
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${ENDPOINTS.LANDLORDS}?id=${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete landlord');
  }
};

export const citiesService = {
  async getAll(): Promise<string[]> {
    const response = await fetch(ENDPOINTS.CITIES);
    if (!response.ok) throw new Error('Failed to fetch cities');
    return response.json();
  },

  async add(city: string): Promise<string> {
    const response = await fetch(ENDPOINTS.CITIES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: city })
    });
    if (!response.ok) throw new Error('Failed to create city');
    const data = await response.json();
    return data.id;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${ENDPOINTS.CITIES}?id=${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete city');
  }
};

export interface Brand {
  id?: string;
  name: string;
}

export const brandsService = {
  async getAll(): Promise<Brand[]> {
    const cars = await carsService.getAll();
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];
    return uniqueBrands.map(brand => ({ name: brand }));
  },

  async add(name: string): Promise<string> {
    return name;
  },

  async update(id: string, name: string): Promise<void> {
    return;
  },

  async delete(id: string): Promise<void> {
    return;
  }
};
