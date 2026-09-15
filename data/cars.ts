export type CarCategory = '세단' | 'SUV' | '승합·미니밴' | '경차' | '전기·친환경';
export type CarLabel = '인기' | '신차' | '특가' | '즉시출고' | null;

export interface CarStub {
  id: string;
  name: string;
  nameEn: string;
  category: CarCategory;
  monthlyPrice: number;
  fuel: string;
  seats: number;
  year: string;
  label: CarLabel;
}

export const popularCars: CarStub[] = [
  {
    id: '1',
    name: '그랜저',
    nameEn: 'Grandeur',
    category: '세단',
    monthlyPrice: 43,
    fuel: '가솔린',
    seats: 5,
    year: '2024년형',
    label: '인기',
  },
  {
    id: '2',
    name: '싼타페',
    nameEn: 'Santa Fe',
    category: 'SUV',
    monthlyPrice: 55,
    fuel: '디젤',
    seats: 5,
    year: '2024년형',
    label: null,
  },
  {
    id: '3',
    name: '카니발',
    nameEn: 'Carnival',
    category: '승합·미니밴',
    monthlyPrice: 43,
    fuel: '디젤',
    seats: 9,
    year: '2024년형',
    label: '인기',
  },
];