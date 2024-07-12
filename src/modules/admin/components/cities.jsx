import React from 'react';

const TopCities = ({data}) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-sm font-bold mb-4">Top Cities(Usage rate)</h2>
        <div className="space-y-2">
          {data?.slice(0,5)?.map((item, index) => {
            const percentage = (item.rate * 100).toFixed(2);
            return (
              <div key={index} className="flex items-center justify-between">
                <span className='text-sm'>{item.city}</span>
                <div className="flex items-center">
                  <div className="w-40 bg-gray-200 rounded-full h-4 mr-2">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className='text-sm'>{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default TopCities;