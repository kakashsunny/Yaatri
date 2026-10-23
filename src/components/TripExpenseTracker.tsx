import React, { useState, useEffect } from 'react';
import { 
  IndianRupee, 
  Users, 
  Plus, 
  Trash2, 
  Receipt, 
  Wallet,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { getStoredExpenses, setStoredExpenses, StoredExpenseEntry } from '../lib/storage.ts';
import { ConfirmModal } from './ConfirmModal.tsx';

interface TripExpenseTrackerProps {
  estimatedBudgetInr: number;
  totalDays: number;
  lang: 'en' | 'kn';
  tripKey?: string;
}

interface ExpenseEntry extends StoredExpenseEntry {}

type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

const currencyRates: Record<CurrencyCode, { symbol: string; rateFromInr: number }> = {
  INR: { symbol: '₹', rateFromInr: 1 },
  USD: { symbol: '$', rateFromInr: 1 / 83.5 },
  EUR: { symbol: '€', rateFromInr: 1 / 90.5 },
  GBP: { symbol: '£', rateFromInr: 1 / 106.0 },
  AED: { symbol: 'AED ', rateFromInr: 1 / 22.7 },
};

const defaultExpenses: ExpenseEntry[] = [
  { id: '1', category: 'stay', title: 'Heritage Homestay / Resort', amountInr: 2200 },
  { id: '2', category: 'transport', title: 'KSRTC Airavat & Local Auto/Cab', amountInr: 950 },
  { id: '3', category: 'food', title: 'Traditional Mylari Dosa & South Thali', amountInr: 450 },
  { id: '4', category: 'tickets', title: 'Palace Entry & Archaeological Passes', amountInr: 300 },
];

export const TripExpenseTracker: React.FC<TripExpenseTrackerProps> = ({
  estimatedBudgetInr,
  totalDays,
  lang,
  tripKey = 'active_trip',
}) => {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(() => {
    const stored = getStoredExpenses(tripKey);
    return stored && stored.length > 0 ? stored : defaultExpenses;
  });

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('INR');
  const [travelerCount, setTravelerCount] = useState<number>(2);

  // Form states for adding new expense
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseEntry['category']>('food');
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseEntry | null>(null);

  // Persist to storage
  useEffect(() => {
    setStoredExpenses(tripKey, expenses);
  }, [expenses, tripKey]);

  const currencyConfig = currencyRates[selectedCurrency];

  const formatCurrency = (inrValue: number) => {
    const converted = inrValue * currencyConfig.rateFromInr;
    if (selectedCurrency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${currencyConfig.symbol}${converted.toFixed(2)}`;
  };

  const totalSpentInr = expenses.reduce((acc, curr) => acc + curr.amountInr, 0);
  const remainingBudgetInr = estimatedBudgetInr - totalSpentInr;
  const spentPct = Math.min(Math.round((totalSpentInr / Math.max(estimatedBudgetInr, 1)) * 100), 100);

  const perPersonCostInr = Math.round(totalSpentInr / Math.max(travelerCount, 1));

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount || Number(newAmount) <= 0) return;

    const newEntry: ExpenseEntry = {
      id: Date.now().toString(),
      category: newCategory,
      title: newTitle.trim(),
      amountInr: Number(newAmount),
    };

    setExpenses([newEntry, ...expenses]);
    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  const confirmDeleteExpense = () => {
    if (!expenseToDelete) return;
    setExpenses(expenses.filter(item => item.id !== expenseToDelete.id));
    setExpenseToDelete(null);
  };

  return (
    <div className="rounded-2xl bg-[#13131A] border border-white/10 p-5 sm:p-6 space-y-6 shadow-xl shadow-black/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] tracking-wider uppercase">
            <Wallet className="w-4 h-4 text-[#FFD60A]" />
            <span>{lang === 'kn' ? 'ಲೈವ್ ಖರ್ಚು & ಬಜೆಟ್ ಮ್ಯಾನೇಜರ್' : 'Live Trip Expense & Currency Splitter'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {lang === 'kn' ? 'ಪ್ರವಾಸ ವೆಚ್ಚ ಲೆಕ್ಕಾಚಾರ & ಗ್ರೂಪ್ ಬಿಲ್ ವಿಭಜನೆ' : 'Trip Budget Tracker & Group Bill Split'}
          </h3>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as CurrencyCode[]).map((cur) => (
            <button
              key={cur}
              type="button"
              onClick={() => setSelectedCurrency(cur)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                selectedCurrency === cur 
                  ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Budget */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">
            {lang === 'kn' ? 'ಒಟ್ಟು ಅಂದಾಜು ಬಜೆಟ್' : 'Estimated Target Budget'}
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatCurrency(estimatedBudgetInr)}
          </div>
          <div className="text-[11px] text-slate-400">
            {lang === 'kn' ? `${totalDays} ದಿನಗಳ ಸಂಪೂರ್ಣ ಪ್ರವಾಸ` : `For ${totalDays}-day planned itinerary`}
          </div>
        </div>

        {/* Total Spent */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">
            {lang === 'kn' ? 'ಇಲ್ಲಿಯವರೆಗೆ ದಾಖಲಾದ ವೆಚ್ಚ' : 'Total Logged Expenses'}
          </div>
          <div className="text-2xl font-extrabold text-[#FFD60A]">
            {formatCurrency(totalSpentInr)}
          </div>
          <div className="text-[11px] text-amber-300 font-medium">
            {spentPct}% {lang === 'kn' ? 'ಬಜೆಟ್ ಬಳಕೆ' : 'of budget utilized'}
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">
            {lang === 'kn' ? 'ಉಳಿದ ಬಜೆಟ್ ಬ್ಯಾಲೆನ್ಸ್' : 'Remaining Balance'}
          </div>
          <div className={`text-2xl font-extrabold ${remainingBudgetInr >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(remainingBudgetInr)}
          </div>
          <div className="text-[11px] text-slate-400">
            {remainingBudgetInr >= 0 ? (lang === 'kn' ? 'ಸುರಕ್ಷಿತ ಬಜೆಟ್ ಮಿತಿ' : 'Within comfortable budget') : (lang === 'kn' ? 'ಬಜೆಟ್ ಮೀರಿದೆ' : 'Budget exceeded')}
          </div>
        </div>
      </div>

      {/* Visual Budget Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{lang === 'kn' ? 'ಖರ್ಚು ಪ್ರಗತಿ' : 'Budget Consumption'}</span>
          <span className="font-mono text-white font-semibold">{spentPct}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              spentPct > 90 ? 'bg-rose-500' : spentPct > 70 ? 'bg-[#FFD60A]' : 'bg-[#E85D04]'
            }`}
            style={{ width: `${Math.min(spentPct, 100)}%` }}
          />
        </div>
      </div>

      {/* Group Bill Splitter Widget */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-black/50 via-[#E85D04]/10 to-black/50 border border-[#E85D04]/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#FFD60A]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'kn' ? 'ಗ್ರೂಪ್ ಬಿಲ್ ವಿಭಜನೆ (Split Bill)' : 'Group Expense Splitter'}
            </span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{lang === 'kn' ? 'ಪ್ರಯಾಣಿಕರು:' : 'Travelers:'}</span>
            <div className="flex items-center gap-1 bg-black/60 rounded-lg p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white bg-white/5 cursor-pointer text-xs"
              >
                -
              </button>
              <span className="px-2 font-mono text-xs font-bold text-[#FFD60A]">
                {travelerCount} {travelerCount === 1 ? 'person' : 'people'}
              </span>
              <button
                type="button"
                onClick={() => setTravelerCount(Math.min(10, travelerCount + 1))}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white bg-white/5 cursor-pointer text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
          <span className="text-slate-300">
            {lang === 'kn' ? 'ಪ್ರತಿ ವ್ಯಕ್ತಿಯ ಪಾಲು:' : 'Individual Share Per Traveler:'}
          </span>
          <span className="text-lg font-mono font-extrabold text-[#FFD60A]">
            {formatCurrency(perPersonCostInr)} / person
          </span>
        </div>
      </div>

      {/* Expenses Table & Add Button */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {lang === 'kn' ? 'ದಾಖಲಾದ ಪ್ರವಾಸ ವೆಚ್ಚಗಳು' : 'Itemized Travel Expenses'}
          </span>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E85D04]/20 hover:bg-[#E85D04] border border-[#E85D04]/40 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? (lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel') : (lang === 'kn' ? '+ ವೆಚ್ಚ ಸೇರಿಸಿ' : '+ Add Expense')}</span>
          </button>
        </div>

        {/* Add Expense Form */}
        {showAddForm && (
          <form onSubmit={handleAddExpense} className="p-4 rounded-xl bg-black/60 border border-[#E85D04]/40 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="expense-title-input" className="sr-only">Expense title</label>
                <input
                  id="expense-title-input"
                  type="text"
                  placeholder={lang === 'kn' ? 'ಉದಾ: ಕಾಫಿ & ಮಸಾಲೆ ದೋಸೆ' : 'Expense item title...'}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D04]"
                  required
                />
              </div>

              <div>
                <label htmlFor="expense-amount-input" className="sr-only">Expense amount</label>
                <input
                  id="expense-amount-input"
                  type="number"
                  placeholder={lang === 'kn' ? 'ಮೊತ್ತ (₹ INR)' : 'Amount in INR (₹)'}
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D04]"
                  required
                />
              </div>

              <div>
                <label htmlFor="expense-category-select" className="sr-only">Expense category</label>
                <select
                  id="expense-category-select"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#E85D04]"
                >
                  <option value="food">🍽️ Food & Dining</option>
                  <option value="stay">🏨 Hotel & Homestay</option>
                  <option value="transport">🚕 Transport & Fuel</option>
                  <option value="tickets">🎟️ Entry Tickets</option>
                  <option value="shopping">🛍️ Souvenirs & Crafts</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#E85D04] hover:bg-[#ff6e0f] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              {lang === 'kn' ? 'ವೆಚ್ಚ ದಾಖಲಿಸಿ' : 'Save Expense Entry'}
            </button>
          </form>
        )}

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 bg-black/20 rounded-xl border border-white/5">
            No expenses logged yet. Click "+ Add Expense" above.
          </div>
        ) : (
          <div className="divide-y divide-white/5 rounded-xl border border-white/10 bg-black/30 overflow-hidden">
            {expenses.map((item) => (
              <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Receipt className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span className="text-white font-medium truncate">{item.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-slate-400 capitalize hidden sm:inline-block">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-bold text-white">
                    {formatCurrency(item.amountInr)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpenseToDelete(item)}
                    className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={expenseToDelete !== null}
        title={lang === 'kn' ? 'ವೆಚ್ಚವನ್ನು ತೆಗೆದುಹಾಕುವುದೇ?' : 'Remove Expense Entry?'}
        message={
          lang === 'kn'
            ? `ನೀವು "${expenseToDelete?.title}" ವೆಚ್ಚವನ್ನು ತೆಗೆದುಹಾಕಲು ಖಚಿತವಾಗಿದ್ದೀರಾ?`
            : `Are you sure you want to remove "${expenseToDelete?.title}" (${formatCurrency(expenseToDelete?.amountInr || 0)})?`
        }
        confirmLabel={lang === 'kn' ? 'ತೆಗೆದುಹಾಕಿ' : 'Remove'}
        cancelLabel={lang === 'kn' ? 'ರದ್ದು' : 'Cancel'}
        onConfirm={confirmDeleteExpense}
        onCancel={() => setExpenseToDelete(null)}
      />
    </div>
  );
};
