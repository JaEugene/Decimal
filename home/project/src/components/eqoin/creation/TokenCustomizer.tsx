import { FC } from 'react';
import { Coins, Palette } from 'lucide-react';
import { Card } from '../../ui/Card';

interface TokenCustomization {
  supply: number;
  value: number;
  primaryColor: string;
  secondaryColor: string;
  logo?: File;
}

interface TokenCustomizerProps {
  customization: TokenCustomization;
  onChange: (updates: Partial<TokenCustomization>) => void;
}

export const TokenCustomizer: FC<TokenCustomizerProps> = ({
  customization,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Coins className="text-blue-500" />
            Token Economics
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Total Supply</label>
              <input
                type="number"
                value={customization.supply}
                onChange={(e) => onChange({ supply: Number(e.target.value) })}
                className="w-full bg-gray-800 rounded-lg p-2"
                min="1000"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Initial Value (USD)</label>
              <input
                type="number"
                value={customization.value}
                onChange={(e) => onChange({ value: Number(e.target.value) })}
                className="w-full bg-gray-800 rounded-lg p-2"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Palette className="text-blue-500" />
            Visual Design
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => onChange({ primaryColor: e.target.value })}
                className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <input
                type="color"
                value={customization.secondaryColor}
                onChange={(e) => onChange({ secondaryColor: e.target.value })}
                className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange({ logo: file });
                }}
                className="w-full bg-gray-800 rounded-lg p-2"
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-blue-500/10">
        <h3 className="font-semibold mb-4">Preview</h3>
        <div className="flex items-center justify-center p-8 bg-gray-800 rounded-lg">
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
            }}
          />
        </div>
      </Card>
    </div>
  );
};