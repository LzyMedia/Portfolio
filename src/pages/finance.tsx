import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { SavingsGoal, Transaction } from '../types/finance';
import {
  loadGoals,
  loadTransactions,
  addGoal,
  updateGoal,
  deleteGoal,
  addTransaction,
  deleteTransaction,
  generateId,
  formatCurrency,
  calculateProgress,
} from '../utils/finance-storage';
import GoalCard from '../components/finance/GoalCard';
import AddGoalModal from '../components/finance/AddGoalModal';
import AddTransactionModal from '../components/finance/AddTransactionModal';
import GoalDetailsModal from '../components/finance/GoalDetailsModal';

const FinanceTracker: React.FC = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    setGoals(loadGoals());
    setTransactions(loadTransactions());
  }, []);

  const handleAddGoal = (goalData: Omit<SavingsGoal, 'id' | 'createdAt' | 'updatedAt' | 'currentAmount'>) => {
    const newGoal: SavingsGoal = {
      ...goalData,
      id: generateId(),
      currentAmount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedGoals = addGoal(newGoal);
    setGoals(updatedGoals);
    setIsAddGoalModalOpen(false);
  };

  const handleUpdateGoal = (goalId: string, updates: Partial<SavingsGoal>) => {
    const updatedGoals = updateGoal(goalId, updates);
    setGoals(updatedGoals);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal? All associated transactions will also be deleted.')) {
      const updatedGoals = deleteGoal(goalId);
      setGoals(updatedGoals);
      setIsDetailsModalOpen(false);
    }
  };

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const updatedTransactions = addTransaction(newTransaction);
    setTransactions(updatedTransactions);
    setGoals(loadGoals()); // Reload goals to get updated amounts
    setIsAddTransactionModalOpen(false);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      const updatedTransactions = deleteTransaction(transactionId);
      setTransactions(updatedTransactions);
      setGoals(loadGoals()); // Reload goals to get updated amounts
    }
  };

  const handleViewDetails = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setIsDetailsModalOpen(true);
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = calculateProgress(totalSaved, totalTarget);

  return (
    <>
      <Head>
        <title>Car Finance Tracker | Save for Your Dream Car</title>
        <meta name="description" content="Track your savings for cars, modifications, and parts" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">🏎️ Car Finance Tracker</h1>
                <p className="text-gray-400">Save for your dream car, mods, and parts</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddTransactionModalOpen(true)}
                  disabled={goals.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💰 Add Transaction
                </button>
                <button
                  onClick={() => setIsAddGoalModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + New Goal
                </button>
              </div>
            </div>

            {/* Overall Progress */}
            {goals.length > 0 && (
              <div className="mt-6 bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
                  <span className="text-2xl font-bold text-blue-400">{overallProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatCurrency(totalSaved)} saved</span>
                  <span>{formatCurrency(totalTarget)} target</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {goals.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🚗</div>
              <h2 className="text-2xl font-semibold text-white mb-2">No Savings Goals Yet</h2>
              <p className="text-gray-400 mb-6">Create your first goal to start saving for your dream car!</p>
              <button
                onClick={() => setIsAddGoalModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onViewDetails={() => handleViewDetails(goal)}
                  onAddTransaction={() => {
                    setSelectedGoal(goal);
                    setIsAddTransactionModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        <AddGoalModal
          isOpen={isAddGoalModalOpen}
          onClose={() => setIsAddGoalModalOpen(false)}
          onAdd={handleAddGoal}
        />

        <AddTransactionModal
          isOpen={isAddTransactionModalOpen}
          onClose={() => {
            setIsAddTransactionModalOpen(false);
            setSelectedGoal(null);
          }}
          onAdd={handleAddTransaction}
          goals={goals}
          preselectedGoalId={selectedGoal?.id}
        />

        {selectedGoal && (
          <GoalDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedGoal(null);
            }}
            goal={selectedGoal}
            transactions={transactions.filter((t) => t.goalId === selectedGoal.id)}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}
      </div>
    </>
  );
};

export default FinanceTracker;
