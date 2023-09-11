"use client"

import React, { useEffect, useRef } from 'react';


export const HorizontalBar = ({ num1, num2 }) => {
    const total = num1 + num2;
    const percentage = (num1 / total) * 100;
  
    return (
      <div className="barContainer w-full h-[4px] bg-gray-600 rounded-full">
        <div 
          className="h-full rounded-full bg-green-400" 
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
    );
  };
  