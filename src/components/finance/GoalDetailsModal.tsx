import React, { useState } from 'react';
import { SavingsGoal, Transaction } from '../../types/finance';
import { formatCurrency, calculateProgress } from '../../utils/finance-storage';

interface GoalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: SavingsGoal;
  transactions: Transaction[];
  onUpdateGoal: (goalId: string, updates: Partial<SavingsGoal>) => void;
  onDeleteGoal: (goalId: string) => void;
  onDeleteTransaction: (transactionId: string) => void;
}

const GoalDetailsModal: React.FC<GoalDetailsModalProps> = ({
  isOpen,
  onClose,
  goal,
  transactions,
  onUpdateGoal,
  onDeleteGoal,
  onDeleteTransaction,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(goal.name);
  const [editedTarget, setEditedTarget] = useState(goal.targetAmount.toString());
  const [editedDeadline, setEditedDeadline] = useState(goal.deadline || '');
  const [editedDescription, setEditedDescription] = useState(goal.description || '');

  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const totalDeposits = transactions.filter((t) => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions.filter((t) => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);

  const handleSaveEdit = () => {
    const target = parseFloat(editedTarget);
    if (isNaN(target) || target <= 0) {
      alert('Please enter a valid target amount');
      return;
    }

    onUpdateGoal(goal.id, {
      name: editedName,
      targetAmount: target,
      deadline: editedDeadline || undefined,
      description: editedDescription || undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(goal.name);
    setEditedTarget(goal.targetAmount.toString());
    setEditedDeadline(goal.deadline || '');
    setEditedDescription(goal.description || '');
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full border border-gray-700 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-2xl font-bold text-white bg-white/20 rounded px-3 py-1 w-full border border-white/30 focus:outline-none focus:border-white"
            />
          ) : (
            <h2 className="text-2xl font-bold text-white">{goal.name}</h2>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/80 text-sm uppercase tracking-wide">{goal.category}</span>
            <span className="text-3xl font-bold text-white">{progress.toFixed(1)}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-4 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>{formatCurrency(goal.currentAmount)}</span>
              <span>{formatCurrency(goal.targetAmount)}</span>
            </div>
          </div>

          {/* Goal Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Current Savings</div>
              <div className="text-2xl font-bold text-green-400">{formatCurrency(goal.currentAmount)}</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Target Amount</div>
              {isEditing ? (
                <input
                  type="number"
                  value={editedTarget}
                  onChange={(e) => setEditedTarget(e.target.value)}
                  className="text-2xl font-bold text-blue-400 bg-gray-800 rounded px-2 py-1 w-full border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="text-2xl font-bold text-blue-400">{formatCurrency(goal.targetAmount)}</div>
              )}
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Remaining</div>
              <div className="text-2xl font-bold text-orange-400">
                {formatCurrency(goal.targetAmount - goal.currentAmount)}
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Deadline</div>
              {isEditing ? (
                <input
                  type="date"
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="text-lg font-bold text-yellow-400 bg-gray-800 rounded px-2 py-1 w-full border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="text-lg font-bold text-yellow-400">
                  {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'No deadline'}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {(isEditing || goal.description) && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">Description</div>
              {isEditing ? (
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                />
              ) : (
                <div className="text-white">{goal.description || 'No description'}</div>
              )}
            </div>
          )}

          {/* Transaction Summary */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">Transaction Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-400">Total Deposits</div>
                <div className="text-xl font-bold text-green-400">{formatCurrency(totalDeposits)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Withdrawals</div>
                <div className="text-xl font-bold text-red-400">{formatCurrency(totalWithdrawals)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Transactions</div>
                <div className="text-xl font-bold text-blue-400">{transactions.length}</div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Transaction History</h3>
            <div className="bg-gray-900 rounded-lg border border-gray-700 max-h-64 overflow-y-auto">
              {transactions.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No transactions yet</div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-800 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {transaction.type === 'deposit' ? '💰' : '💸'}
                            </span>
                            <div>
                              <div className="text-white font-medium">{transaction.description}</div>
                              <div className="text-sm text-gray-400">
                                {new Date(transaction.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-lg font-bold ${
                              transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {transaction.type === 'deposit' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </span>
                          <button
                            onClick={() => onDeleteTransaction(transaction.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete transaction"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✏️ Edit Goal
                </button>
                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailsModal;
