import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WeeklyGoals = () => {
    const solved = 12;
    const target = 20;
    const percentage = (solved / target) * 100;

    const days = [
        { name: 'M', active: true },
        { name: 'T', active: true },
        { name: 'W', active: false },
        { name: 'T', active: true },
        { name: 'F', active: false },
        { name: 'S', active: false },
        { name: 'S', active: false },
    ];

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h4 className="text-sm font-semibold text-gray-600">Problems Solved</h4>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-800">{solved}</span>
                    <span className="text-gray-500 font-medium">/ {target} this week</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${percentage}%`, transition: 'width 1s ease-in-out' }}
                    ></div>
                </div>
            </div>

            <div className="mt-8">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Activity</h4>
                <div className="flex justify-between items-center">
                    {days.map((day, ix) => (
                        <div key={ix} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center border ${day.active
                                        ? 'bg-primary border-primary text-white'
                                        : 'bg-white border-gray-300 text-transparent'
                                    }`}
                            >
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{day.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeklyGoals;
