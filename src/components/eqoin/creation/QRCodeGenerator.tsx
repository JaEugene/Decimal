import { FC } from 'react';
import { QRCode } from 'qrcode.react';
import { Card } from '../../ui/Card';
import { Download, Share2 } from 'lucide-react';

interface QRCodeGeneratorProps {
  data: {
    id: string;
    name: string;
    supply: number;
    value: number;
  };
}

export const QRCodeGenerator: FC<QRCodeGeneratorProps> = ({ data }) => {
  const qrData = JSON.stringify({
    type: 'equityqoin',
    ...data,
    timestamp: new Date().toISOString()
  });

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `equityqoin-${data.id}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EquityQoin QR Code',
          text: 'Scan this QR code to access EquityQoin details',
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Your EquityQoin is Ready!</h2>
      <div className="bg-white p-6 rounded-lg inline-block mb-6">
        <QRCode 
          value={qrData} 
          size={250} 
          level="H"
          includeMargin={true}
        />
      </div>
      
      <div className="space-y-4">
        <div className="text-left space-y-2">
          <p className="text-gray-400">Token Details:</p>
          <ul className="space-y-1 text-sm">
            <li>Name: {data.name}</li>
            <li>Supply: {data.supply.toLocaleString()} tokens</li>
            <li>Initial Value: ${data.value.toFixed(2)}</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC] transition-colors"
          >
            <Download size={18} />
            Download QR
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Scan this QR code to access your EquityQoin details and share with potential investors.
        </p>
      </div>
    </Card>
  );
};