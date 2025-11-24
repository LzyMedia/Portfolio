export type GoalCategory = 'car' | 'mods' | 'parts' | 'other';

export interface SavingsGoal {
  id: string;
  name: string;
  category: GoalCategory;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  goalId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  description: string;
  date: string;
  createdAt: string;
}

export interface DealItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  website: string;
  url: string;
  inStock: boolean;
  imageUrl?: string;
  description?: string;
  lastUpdated: string;
}

export interface PriceComparison {
  searchQuery: string;
  items: DealItem[];
  lastSearched: string;
}
