import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import OverallReadiness from '../components/dashboard/OverallReadiness';
import SkillBreakdown from '../components/dashboard/SkillBreakdown';
import ContinuePractice from '../components/dashboard/ContinuePractice';
import WeeklyGoals from '../components/dashboard/WeeklyGoals';
import UpcomingAssessments from '../components/dashboard/UpcomingAssessments';

function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Row */}
                <Card className="h-80 shadow-sm border border-gray-100 flex flex-col">
                    <CardContent className="h-full p-0 flex items-center justify-center">
                        <OverallReadiness score={72} />
                    </CardContent>
                </Card>

                <Card className="h-80 shadow-sm border border-gray-100 flex flex-col">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <SkillBreakdown />
                    </CardContent>
                </Card>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    <Card className="shadow-sm border border-gray-100 h-[340px]">
                        <CardContent className="p-6 h-full text-center lg:text-left">
                            <ContinuePractice />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    <Card className="shadow-sm border border-gray-100 h-[340px]">
                        <CardContent className="p-6 h-full">
                            <WeeklyGoals />
                        </CardContent>
                    </Card>
                </div>

                {/* Third Row Span */}
                <Card className="shadow-sm border border-gray-100 lg:col-span-2">
                    <CardHeader className="border-b border-gray-50 pb-4 mb-4">
                        <CardTitle className="text-lg">Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpcomingAssessments />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export default Dashboard;
