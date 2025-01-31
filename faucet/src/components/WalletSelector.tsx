import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WALLETS, WalletInfo } from '../lib/wallets';

interface WalletSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (wallet: WalletInfo) => void;
}

const WalletSelector = ({ isOpen, onClose, onSelect }: WalletSelectorProps) => {
  const [availableWallets, setAvailableWallets] = useState(WALLETS);

  useEffect(() => {
    const wallets = WALLETS.map(wallet => ({
      ...wallet,
      disabled: wallet.disabled || !wallet.checkAvailability()
    }));
    setAvailableWallets(wallets);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect a Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => !wallet.disabled && onSelect(wallet)}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors
                ${wallet.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={wallet.disabled}
            >
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="flex-grow text-left font-medium">{wallet.name}</span>
              {wallet.disabled && (
                <span className="text-sm text-slate-500">
                  {!wallet.checkAvailability() ? 'Not installed' : 'Not available'}
                </span>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelector;
