import React, { useState } from 'react';
import { Lock, Delete, Fingerprint, ShieldCheck } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { audioSynth } from '../../services/audioSynthesizer';

export const PasscodeLockScreen: React.FC = () => {
  const { isLocked, setIsLocked, user } = useApp();
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);

  if (!isLocked) return null;

  const handleKeyPress = (num: string) => {
    audioSynth.playTapback();
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);

      if (newPin.length === 4) {
        // Validate PIN
        if (newPin === (user.pinCode || '1234')) {
          audioSynth.playChime('crystal');
          setIsLocked(false);
          setPin('');
        } else {
          setIsError(true);
          setTimeout(() => {
            setPin('');
            setIsError(false);
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleBiometricSim = () => {
    audioSynth.playChime('crystal');
    setIsLocked(false);
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-[48px] select-none text-white p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xs flex flex-col items-center space-y-8">
        {/* Lock Icon and Title */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl">
            <Lock size={24} className="text-white" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">Enter Aether Passcode</h2>
          <p className="text-xs text-white/60">Demo Default Passcode: 1234</p>
        </div>

        {/* 4-Digit Indicator Dots */}
        <div className={`flex items-center gap-4 ${isError ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full border border-white/40 transition-all duration-150 ${
                pin.length > idx ? 'bg-white scale-125' : 'bg-transparent'
              } ${isError ? 'border-red-500 bg-red-500' : ''}`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeyPress(digit)}
              className="w-16 h-16 rounded-full mx-auto bg-white/10 hover:bg-white/20 active:bg-white/30 text-2xl font-light flex items-center justify-center transition-all active:scale-95 border border-white/5"
            >
              {digit}
            </button>
          ))}

          {/* Biometrics trigger */}
          <button
            onClick={handleBiometricSim}
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-cyan-400 hover:bg-white/10 transition-colors"
            title="Biometric Face ID / Touch ID Unlock"
          >
            <Fingerprint size={28} />
          </button>

          {/* 0 Key */}
          <button
            onClick={() => handleKeyPress('0')}
            className="w-16 h-16 rounded-full mx-auto bg-white/10 hover:bg-white/20 active:bg-white/30 text-2xl font-light flex items-center justify-center transition-all active:scale-95 border border-white/5"
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white/70 hover:text-white transition-colors"
            title="Delete"
          >
            <Delete size={22} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-white/50">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Local Device Vault Encryption</span>
        </div>
      </div>
    </div>
  );
};
