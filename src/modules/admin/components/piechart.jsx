import React from 'react';

const PieChart = ({ data }) => {
    console.log(data,"dara")
  const totalEngagementDuration = data?.reduce((acc, curr) => acc + parseInt(curr.metrics.userEngagementDuration, 10), 0);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 rounded-full">
        {data.map((entry, index) => {
          const percentage = (parseInt(entry.metrics.userEngagementDuration, 10) / totalEngagementDuration) * 100;
          const rotation = data.slice(0, index).reduce((acc, curr) => acc + (parseInt(curr.metrics.userEngagementDuration, 10) / totalEngagementDuration) * 360, 0);
          
          return (
            <div
              key={index}
              className="absolute w-full h-full rounded-full"
              style={{
                background: `conic-gradient(from ${rotation}deg, ${
                  index % 2 === 0 ? '#4caf50' : '#ffeb3b'
                } 0% ${percentage}%, transparent ${percentage}% 100%)`
              }}
            ></div>
          );
        })}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-800 flex flex-col w-full items-center">
          <span className='text-xs'>Engagement Duration</span>
          <h5>
            {data[0]?.metrics?.userEngagementDuration}
          </h5>
          <h5>Seconds</h5>
         
        </div>
      </div>
    </div>
  );
};

export default PieChart;
