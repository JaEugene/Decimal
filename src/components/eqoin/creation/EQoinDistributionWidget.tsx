<div className="space-y-6">
  {distributionData.map((item) => (
    <div key={item.label} className="space-y-2">
      <div className="flex items-center justify-between bg-[#4169E1]/10 backdrop-blur-sm border border-[#4169E1]/20 rounded-lg p-4">
        <div className="flex items-center gap-2">
          {item.icon}
          <span className="font-medium text-gray-900">{item.label}</span>
        </div>
        <span className="font-bold text-gray-900">{item.amount.toLocaleString()} E-Qoins</span>
      </div>
      <div className="h-2 bg-[#4169E1]/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${item.color}`}
          style={{ width: `${(item.amount / total) * 100}%` }}
        />
      </div>
      <p className="text-sm font-medium text-gray-600 text-right">
        {((item.amount / total) * 100).toFixed(1)}%
      </p>
    </div>
  ))}

  {size === 'expanded' && (
    <div className="mt-8 p-6 bg-[#4169E1]/10 backdrop-blur-sm border border-[#4169E1]/20 rounded-xl">
      <h4 className="text-xl font-bold text-gray-900 mb-4">Distribution Details</h4>
      <div className="space-y-3">
        <p className="font-medium text-gray-800">Total Supply: <span className="font-bold">{total.toLocaleString()} E-Qoins</span></p>
        <p className="font-medium text-gray-800">Current Market Value: <span className="font-bold">${((total * 10.00) / 1000000).toFixed(2)}M</span></p>
        <p className="font-medium text-gray-800">Distribution Start: <span className="font-bold">January 1, 2024</span></p>
        <p className="font-medium text-gray-800">Next Unlock Date: <span className="font-bold">June 1, 2024</span></p>
      </div>
    </div>
  )}
</div>