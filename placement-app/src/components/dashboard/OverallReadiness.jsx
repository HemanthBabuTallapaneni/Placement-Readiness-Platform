import React, { useEffect, useState } from 'react';

const OverallReadiness = ({ score = 72 }) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    useEffect(() => {
        // Basic animation on mount
        const timer = setTimeout(() => {
            setAnimatedScore(score);
        }, 100);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className="flex flex-col items-center justify-center p-6 h-full">
            <div className="relative flex items-center justify-center">
                {/* Background Circle */}
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                    <circle
                        stroke="#E5E7EB" // Tailwind gray-200
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Progress Circle */}
                    <circle
                        stroke="hsl(245, 58%, 51%)" // Primary theme color
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-gray-800">{animatedScore}</span>
                    <span className="text-sm font-medium text-gray-400">/100</span>
                </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-800">Readiness Score</h3>
            <p className="text-gray-500 text-sm mt-1 text-center">
                You are on track for upcoming placements.
            </p>
        </div>
    );
};

export default OverallReadiness;
