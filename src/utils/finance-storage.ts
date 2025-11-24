import { SavingsGoal, Transaction } from '../types/finance';

const STORAGE_KEYS = {
  GOALS: 'car_finance_goals',
  TRANSACTIONS: 'car_finance_transactions',
};

// Goals Storage
export const saveGoals = (goals: SavingsGoal[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }
};

export const loadGoals = (): SavingsGoal[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const addGoal = (goal: SavingsGoal): SavingsGoal[] => {
  const goals = loadGoals();
  const newGoals = [...goals, goal];
  saveGoals(newGoals);
  return newGoals;
};

export const updateGoal = (goalId: string, updates: Partial<SavingsGoal>): SavingsGoal[] => {
  const goals = loadGoals();
  const newGoals = goals.map((goal) =>
    goal.id === goalId ? { ...goal, ...updates, updatedAt: new Date().toISOString() } : goal
  );
  saveGoals(newGoals);
  return newGoals;
};

export const deleteGoal = (goalId: string): SavingsGoal[] => {
  const goals = loadGoals();
  const newGoals = goals.filter((goal) => goal.id !== goalId);
  saveGoals(newGoals);

  // Also delete associated transactions
  const transactions = loadTransactions();
  const newTransactions = transactions.filter((t) => t.goalId !== goalId);
  saveTransactions(newTransactions);

  return newGoals;
};

// Transactions Storage
export const saveTransactions = (transactions: Transaction[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }
};

export const loadTransactions = (): Transaction[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const addTransaction = (transaction: Transaction): Transaction[] => {
  const transactions = loadTransactions();
  const newTransactions = [...transactions, transaction];
  saveTransactions(newTransactions);

  // Update goal's current amount
  const goals = loadGoals();
  const goal = goals.find((g) => g.id === transaction.goalId);
  if (goal) {
    const amountChange = transaction.type === 'deposit' ? transaction.amount : -transaction.amount;
    updateGoal(transaction.goalId, { currentAmount: goal.currentAmount + amountChange });
  }

  return newTransactions;
};

export const deleteTransaction = (transactionId: string): Transaction[] => {
  const transactions = loadTransactions();
  const transaction = transactions.find((t) => t.id === transactionId);

  if (transaction) {
    // Reverse the amount change in the goal
    const goals = loadGoals();
    const goal = goals.find((g) => g.id === transaction.goalId);
    if (goal) {
      const amountChange = transaction.type === 'deposit' ? -transaction.amount : transaction.amount;
      updateGoal(transaction.goalId, { currentAmount: goal.currentAmount + amountChange });
    }
  }

  const newTransactions = transactions.filter((t) => t.id !== transactionId);
  saveTransactions(newTransactions);
  return newTransactions;
};

export const getTransactionsByGoal = (goalId: string): Transaction[] => {
  const transactions = loadTransactions();
  return transactions
    .filter((t) => t.goalId === goalId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Utility functions
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};
