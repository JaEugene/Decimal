import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Target, DollarSign, Users, CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    tokenName: string;
    purpose: string;
    distributionModel: string;
    supply: number;
    value: number;
    milestones: Array<{ title: string; description: string }>;
    payoutConfig: {
      type: string;
      schedule?: string;
    };
  };
}

export const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Success Animation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
        
        {/* Header */}
        <div className="p-6 text-center bg-gradient-to-b from-[#0000FF]/5 to-transparent">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0000FF] flex items-center justify-center"
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            EquityQoin Created Successfully!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            Your EquityQoin is now ready for launch
          </motion.p>
        </div>

        {/* Details Grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="col-span-2 p-4 bg-[#0000FF]/5 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-[#0000FF]" />
              <h3 className="font-semibold">Token Details</h3>
            </div>
            <p className="text-gray-700">Name: {data.tokenName}</p>
            <p className="text-gray-700">Initial Supply: {data.supply.toLocaleString()} tokens</p>
            <p className="text-gray-700">Issue Price: ${data.value}</p>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 bg-[#0000FF]/5 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-[#0000FF]" />
              <h3 className="font-semibold">Purpose</h3>
            </div>
            <p className="text-gray-700">{data.purpose}</p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 bg-[#0000FF]/5 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-[#0000FF]" />
              <h3 className="font-semibold">Distribution Model</h3>
            </div>
            <p className="text-gray-700">{data.distributionModel}</p>
          </motion.div>

          {data.milestones.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="col-span-2 p-4 bg-[#0000FF]/5 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-[#0000FF]" />
                <h3 className="font-semibold">Milestones</h3>
              </div>
              <ul className="space-y-2">
                {data.milestones.map((milestone, index) => (
                  <li key={index} className="text-gray-700">• {milestone.title}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="col-span-2 p-4 bg-[#0000FF]/5 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-[#0000FF]" />
              <h3 className="font-semibold">Creation Details</h3>
            </div>
            <p className="text-gray-700">Created on: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-700">Payout Type: {data.payoutConfig.type}</p>
            {data.payoutConfig.schedule && (
              <p className="text-gray-700">Schedule: {data.payoutConfig.schedule}</p>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC] transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};