import { FC } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from './Card';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <Card className="bg-red-500/10 border-red-500/20">
    <div className="flex items-center gap-3 text-red-400">
      <AlertTriangle size={24} />
      <div>
        <h3 className="font-semibold">Error</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </Card>
);