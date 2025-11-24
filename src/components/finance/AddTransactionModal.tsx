import React, { useState, useEffect } from 'react';
import { SavingsGoal, Transaction } from '../../types/finance';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  goals: SavingsGoal[];
  preselectedGoalId?: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  goals,
  preselectedGoalId,
}) => {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (preselectedGoalId) {
      setGoalId(preselectedGoalId);
    } else if (goals.length > 0 && !goalId) {
      setGoalId(goals[0].id);
    }
  }, [preselectedGoalId, goals, goalId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!goalId || !amount || !description) {
      alert('Please fill in all required fields');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Check if withdrawal would make current amount negative
    if (type === 'withdrawal') {
      const goal = goals.find((g) => g.id === goalId);
      if (goal && goal.currentAmount - amountNum < 0) {
        alert('Withdrawal amount cannot exceed current savings');
        return;
      }
    }

    onAdd({
      goalId,
      amount: amountNum,
      type,
      description,
      date,
    });

    // Reset form
    setAmount('');
    setType('deposit');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full border border-gray-700">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${
            type === 'deposit' ? 'from-green-600 to-green-700' : 'from-red-600 to-red-700'
          } p-6 rounded-t-lg`}
        >
          <h2 className="text-2xl font-bold text-white">
            {type === 'deposit' ? '💰 Add Deposit' : '💸 Record Withdrawal'}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {type === 'deposit' ? 'Add money to your savings goal' : 'Record money spent from your goal'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Transaction Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('deposit')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  type === 'deposit'
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                💰 Deposit
              </button>
              <button
                type="button"
                onClick={() => setType('withdrawal')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  type === 'withdrawal'
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                💸 Withdrawal
              </button>
            </div>
          </div>

          {/* Goal Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Goal <span className="text-red-400">*</span>
            </label>
            <select
              value={goalId}
              onChange={(e) => setGoalId(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            >
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} - ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-gray-400">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === 'deposit' ? 'e.g., Monthly savings' : 'e.g., Bought exhaust system'}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                type === 'deposit' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {type === 'deposit' ? 'Add Deposit' : 'Record Withdrawal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
