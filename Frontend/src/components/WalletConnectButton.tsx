import { ConnectButton } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";

export const WalletConnectButton = () => {
  const currentAccount = useCurrentAccount();

  return (
    <ConnectButton 
      connectText="連接錢包"
      style={{
        backgroundColor: currentAccount ? '#22c55e' : '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.875rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = currentAccount ? '#16a34a' : '#2563eb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = currentAccount ? '#22c55e' : '#3b82f6';
      }}
    />
  );
};
