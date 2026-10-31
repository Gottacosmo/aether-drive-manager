import React, { useState } from 'react';
import { X, Divide, Calculator, Receipt, QrCode, Check, Download, Printer } from 'lucide-react';
import { useApp } from '../../state/AppContext';

// Smart Bill Splitter Modal
export const BillSplitterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { contacts, splitBill } = useApp();
  const [totalBill, setTotalBill] = useState('120.00');
  const [tipPct, setTipPct] = useState(18);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([contacts[0]?.id || '']);

  const billNum = parseFloat(totalBill) || 0;
  const tipAmount = billNum * (tipPct / 100);
  const totalWithTip = billNum + tipAmount;
  const splitCount = selectedContacts.length + 1; // You + selected contacts
  const perPerson = totalWithTip / splitCount;

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleExecuteSplit = () => {
    splitBill('Group Dinner & Drinks', billNum, tipPct, selectedContacts);
    alert(`Bill split completed! Requested $${perPerson.toFixed(2)} from ${selectedContacts.length} contact(s).`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-[26px] glass-modal overflow-hidden border border-white/15 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Divide size={20} className="text-indigo-400" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">Smart Bill Splitter</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-[var(--text-secondary)]">
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--text-secondary)] block mb-1">Total Bill Amount ($ USD)</label>
            <input
              type="number"
              step="0.01"
              value={totalBill}
              onChange={(e) => setTotalBill(e.target.value)}
              className="glass-input w-full text-base font-bold font-mono"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] block mb-1.5">Tip Percentage: {tipPct}%</label>
            <div className="flex items-center gap-2">
              {[10, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPct(pct)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    tipPct === pct
                      ? 'bg-[var(--accent-primary)] text-white border-transparent'
                      : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] block mb-1.5">Split With Contacts</label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {contacts.map((c) => {
                const isChecked = selectedContacts.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleContact(c.id)}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[var(--accent-primary)]/15 border-[var(--accent-primary)] text-white'
                        : 'bg-[var(--bg-input)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
                      <span>{c.name}</span>
                    </div>
                    {isChecked && <Check size={14} className="text-[var(--accent-primary)]" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result Calculation Pill */}
          <div className="p-4 rounded-[18px] bg-gradient-to-tr from-indigo-900/40 to-blue-900/40 border border-indigo-400/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-white/70 block">Each Person Pays</span>
              <span className="text-2xl font-extrabold text-white font-mono">${perPerson.toFixed(2)}</span>
            </div>
            <span className="text-xs text-white/60">({splitCount} shares)</span>
          </div>

          <button
            onClick={handleExecuteSplit}
            className="glass-btn glass-btn-primary w-full py-2.5 text-xs font-bold"
          >
            Dispatch Payment Requests
          </button>
        </div>
      </div>
    </div>
  );
};

// Tip Calculator Modal
export const TipCalculatorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [bill, setBill] = useState('75.00');
  const [tipPct, setTipPct] = useState(18);
  const [split, setSplit] = useState(1);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tipPct / 100);
  const total = billNum + tipAmount;
  const perPerson = total / split;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-[26px] glass-modal overflow-hidden border border-white/15 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-amber-400" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">Tip Calculator</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-[var(--text-secondary)]">
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--text-secondary)] block mb-1">Check Subtotal</label>
            <input
              type="number"
              step="0.01"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="glass-input w-full text-base font-bold font-mono"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] block mb-1.5">Tip: {tipPct}%</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPct(pct)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    tipPct === pct
                      ? 'bg-amber-500 text-white border-transparent shadow'
                      : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-[18px] bg-amber-500/15 border border-amber-500/30 text-amber-200 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span>Tip Amount:</span>
              <span className="font-bold">${tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-amber-500/20">
              <span>Total Bill:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="glass-btn glass-btn-primary w-full py-2.5 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Digital Receipt Modal
export const DigitalReceiptModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-[26px] bg-white text-black p-6 space-y-4 shadow-2xl relative font-mono">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 text-gray-500"
        >
          <X size={17} />
        </button>

        <div className="text-center border-b border-dashed border-gray-300 pb-3">
          <h3 className="font-bold text-base tracking-widest uppercase">AETHER PAY</h3>
          <p className="text-[10px] text-gray-500">Official Cryptographic Digital Receipt</p>
        </div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between text-gray-500">
            <span>Transaction:</span>
            <span>AETH-TX-8849-0192</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Recipient:</span>
            <span>Elena Rostova</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Method:</span>
            <span>Aether Cash (E2EE)</span>
          </div>
        </div>

        <div className="border-t border-b border-dashed border-gray-300 py-3 text-sm font-bold flex justify-between">
          <span>AMOUNT TRANSFERRED:</span>
          <span className="text-emerald-600">$450.00 USD</span>
        </div>

        <div className="text-[10px] text-gray-500 text-center">
          SHA-256 Ledger Digest: 9a4f...3e01
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => { alert('Receipt printed.'); onClose(); }}
            className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-black flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button
            onClick={() => { alert('Receipt downloaded.'); onClose(); }}
            className="flex-1 py-2 rounded-xl bg-black hover:bg-gray-800 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download size={14} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment QR Modal
export const PaymentQRModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[24px] p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-[28px] glass-modal overflow-hidden border border-white/15 p-6 flex flex-col items-center text-center space-y-4 shadow-2xl">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Contactless Payment QR</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-[var(--text-secondary)]">
            <X size={17} />
          </button>
        </div>

        <div className="p-4 rounded-[22px] bg-white shadow-2xl flex flex-col items-center">
          {/* Procedural QR Code Mock SVG */}
          <div className="w-48 h-48 bg-black flex items-center justify-center p-2 rounded-lg">
            <QrCode size={170} className="text-white" />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">{user.name}</h4>
          <p className="text-xs text-[var(--accent-primary)] font-mono">@{user.username}</p>
          <p className="text-[11px] text-[var(--text-secondary)] mt-1">
            Scan with any camera or Aether scanner for instant contactless transfer.
          </p>
        </div>

        <button
          onClick={onClose}
          className="glass-btn glass-btn-primary w-full py-2 text-xs font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
};
