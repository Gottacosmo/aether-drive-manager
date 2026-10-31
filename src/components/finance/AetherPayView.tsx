import React, { useState } from 'react';
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Divide,
  Calculator,
  Receipt,
  QrCode,
  Plus,
  ShieldCheck,
  TrendingDown,
  PieChart,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';

export const AetherPayView: React.FC = () => {
  const {
    user,
    transactions,
    contacts,
    sendPayment,
    topUpBalance,
    setActiveModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'budgets' | 'subscriptions'>('overview');
  const [selectedContactId, setSelectedContactId] = useState(contacts[0]?.id || '');
  const [sendAmount, setSendAmount] = useState('50.00');
  const [sendNote, setSendNote] = useState('');

  const handleSendPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(sendAmount);
    if (isNaN(num) || num <= 0) return;
    sendPayment(selectedContactId, num, sendNote);
    setSendNote('');
    alert(`Successfully transferred $${num.toFixed(2)} to recipient.`);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[var(--bg-app)] p-4 md:p-8 select-none">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Aether Pay</h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Contact-to-contact peer payments, smart bill splitting, and financial ledger.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>Sandbox Ledger Verified</span>
            </span>
          </div>
        </div>

        {/* Virtual Metallic Card Banner */}
        <div className="w-full max-w-md mx-auto md:mx-0 rounded-[28px] p-6 bg-gradient-to-tr from-[#1a1b24] via-[#2c2f42] to-[#1e202d] border border-white/20 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xs">
                Æ
              </div>
              <span className="text-xs font-bold tracking-wider opacity-80">AETHER CASH</span>
            </div>
            <span className="text-[11px] font-mono opacity-60">DEBIT / PRIVACY CARD</span>
          </div>

          <div className="mb-6">
            <span className="text-xs text-white/70 block mb-1">Available Balance</span>
            <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
              ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
            <span className="font-mono tracking-widest opacity-80">•••• •••• •••• 8849</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => topUpBalance(250.0)}
                className="px-3 py-1 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 active:scale-95 transition-all"
              >
                + Top Up
              </button>
              <button
                onClick={() => setActiveModal('payment_qr')}
                className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
                title="Personal Payment QR Code"
              >
                <QrCode size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tools Action Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveModal('bill_splitter')}
            className="p-4 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col items-center gap-2 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Divide size={20} />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Split Bill</span>
            <span className="text-[10px] text-[var(--text-secondary)]">Equal or itemized shares</span>
          </button>

          <button
            onClick={() => setActiveModal('tip_calculator')}
            className="p-4 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col items-center gap-2 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calculator size={20} />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Tip Calculator</span>
            <span className="text-[10px] text-[var(--text-secondary)]">10%, 15%, 18%, 20%, custom</span>
          </button>

          <button
            onClick={() => setActiveModal('digital_receipt')}
            className="p-4 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col items-center gap-2 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Receipt size={20} />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Digital Receipts</span>
            <span className="text-[10px] text-[var(--text-secondary)]">Print & download records</span>
          </button>

          <button
            onClick={() => setActiveModal('currency_converter')}
            className="p-4 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col items-center gap-2 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PieChart size={20} />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Currency Converter</span>
            <span className="text-[10px] text-[var(--text-secondary)]">10 major global currencies</span>
          </button>
        </div>

        {/* Quick Send Money Box */}
        <div className="p-5 md:p-6 rounded-[22px] glass-panel border border-[var(--border-subtle)]">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ArrowUpRight size={16} className="text-emerald-400" />
            <span>Send Money to Contact</span>
          </h3>

          <form onSubmit={handleSendPayment} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-medium text-[var(--text-secondary)] block mb-1">
                Recipient
              </label>
              <select
                value={selectedContactId}
                onChange={(e) => setSelectedContactId(e.target.value)}
                className="glass-input w-full text-xs"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#1a1b24] text-white">
                    {c.name} ({c.username ? `@${c.username}` : c.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[var(--text-secondary)] block mb-1">
                Amount ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.50"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="glass-input w-full text-xs font-mono font-bold"
                placeholder="50.00"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-[var(--text-secondary)] block mb-1">
                Memo / Note
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  className="glass-input flex-1 text-xs"
                  placeholder="Dinner, coffee, rent share..."
                />
                <button
                  type="submit"
                  className="glass-btn glass-btn-primary text-xs px-4 flex-shrink-0"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Transaction History Ledger */}
        <div className="p-5 md:p-6 rounded-[22px] glass-panel border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Recent Ledger Activity</h3>
            <span className="text-xs text-[var(--text-secondary)]">{transactions.length} records</span>
          </div>

          <div className="space-y-2.5">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-[14px] bg-[var(--bg-input)] hover:bg-[var(--bg-card-hover)] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      tx.type === 'top_up'
                        ? 'bg-blue-500/20 text-blue-400'
                        : tx.type === 'send'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {tx.type === 'send' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{tx.otherPartyName}</h4>
                    <p className="text-[10px] text-[var(--text-secondary)]">
                      {tx.description} • {new Date(tx.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-sm font-extrabold font-mono ${
                      tx.type === 'send' ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {tx.type === 'send' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[var(--text-secondary)]">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
