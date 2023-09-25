// Cart //
export type Selected = {
  type: number;
  size: number;
};

export type CartItem = {
  category: string;
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  selected: Selected;
  selectedCount: number;
  selectedId: string;
  sizes: number[];
  title: string;
  types: number[];
};

export interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalAmount: number;
}

// Pizzas //
export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: string;
  description: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

// Sort //
export interface SortSliceState {
  value: string;
  currentPage: number;
  category: string;
  searchValue: string;
}
