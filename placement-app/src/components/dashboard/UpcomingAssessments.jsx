import React from 'react';
import { CalendarClock } from 'lucide-react';

const UpcomingAssessments = () => {
    const assessments = [
        { id: 1, title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
        { id: 2, title: 'System Design Review', time: 'Wed, 2:00 PM' },
        { id: 3, title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="space-y-4">
                {assessments.map((ast) => (
                    <div key={ast.id} className="flex flex-row items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                            <CalendarClock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{ast.title}</h4>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">{ast.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4">
                <button className="text-primary text-sm font-semibold hover:underline w-full text-left ml-2">
                    View all assessments &rarr;
                </button>
            </div>
        </div>
    );
};

export default UpcomingAssessments;
