import React from 'react';
import { SavingsGoal } from '../../types/finance';
import { formatCurrency, calculateProgress } from '../../utils/finance-storage';

interface GoalCardProps {
  goal: SavingsGoal;
  onViewDetails: () => void;
  onAddTransaction: () => void;
}

const categoryEmojis = {
  car: '🚗',
  mods: '🔧',
  parts: '⚙️',
  other: '💼',
};

const categoryColors = {
  car: 'from-blue-500 to-blue-600',
  mods: 'from-purple-500 to-purple-600',
  parts: 'from-orange-500 to-orange-600',
  other: 'from-gray-500 to-gray-600',
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onViewDetails, onAddTransaction }) => {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.currentAmount;
  const daysUntilDeadline = goal.deadline
    ? Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all hover:shadow-xl">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${categoryColors[goal.category]} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{categoryEmojis[goal.category]}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{goal.name}</h3>
              <span className="text-xs text-white/80 uppercase tracking-wide">{goal.category}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{progress.toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {goal.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{goal.description}</p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${categoryColors[goal.category]} h-3 transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Amount Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current:</span>
            <span className="text-green-400 font-semibold">{formatCurrency(goal.currentAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Target:</span>
            <span className="text-blue-400 font-semibold">{formatCurrency(goal.targetAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Remaining:</span>
            <span className="text-orange-400 font-semibold">{formatCurrency(remaining)}</span>
          </div>
        </div>

        {/* Deadline */}
        {goal.deadline && (
          <div className="mb-4 p-2 bg-gray-900 rounded border border-gray-700">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">⏰ Deadline:</span>
              <div className="text-right">
                <div className="text-white font-medium">
                  {new Date(goal.deadline).toLocaleDateString()}
                </div>
                {daysUntilDeadline !== null && (
                  <div
                    className={`text-xs ${
                      daysUntilDeadline < 30
                        ? 'text-red-400'
                        : daysUntilDeadline < 90
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    {daysUntilDeadline > 0
                      ? `${daysUntilDeadline} days left`
                      : daysUntilDeadline === 0
                      ? 'Due today!'
                      : 'Overdue'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onAddTransaction}
            className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            💰 Add Funds
          </button>
          <button
            onClick={onViewDetails}
            className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
          >
            📊 Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
