import React from 'react';
import { X, Gift } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative shadow-2xl border-2 border-green-400" style={{ marginTop: '35vh' }}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <div className="mb-4">
            <Gift size={48} className="mx-auto text-yellow-500 animate-pulse" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            🎉 恭喜達成里程碑！
          </h2>
          
          <p className="text-gray-600 mb-4">
            你已經完成了 5 張賓果表！
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-medium">
              可以回到 LINE: 理財動物園
            </p>
            <p className="text-green-700 text-sm mt-1">
              有機會拿 LINE Points 獎勵！
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200"
          >
            太棒了！
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;