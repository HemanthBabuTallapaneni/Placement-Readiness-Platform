import React from 'react';

const ContinuePractice = () => {
    const currentTopic = "Dynamic Programming";
    const completed = 3;
    const total = 10;
    const percentage = (completed / total) * 100;

    return (
        <div className="flex flex-col justify-between h-full space-y-4">
            <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Last Topic</h4>
                <h3 className="text-xl font-bold text-gray-800">{currentTopic}</h3>

                <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-primary">{completed}/{total} Completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${percentage}%`, transition: 'width 1s ease-in-out' }}
                        ></div>
                    </div>
                </div>
            </div>

            <button className="w-full bg-primary hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                Continue Practice
            </button>
        </div>
    );
};

export default ContinuePractice;
