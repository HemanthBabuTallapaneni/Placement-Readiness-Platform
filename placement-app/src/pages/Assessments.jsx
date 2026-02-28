import React, { useState, useEffect } from 'react';
import { processJD } from '../utils/analyzer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { FileSearch, Clock, ChevronRight, CheckCircle2, ListChecks, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';

export default function Assessments() {
    const [activeTab, setActiveTab] = useState('analyze'); // 'analyze', 'history', 'results'
    const [history, setHistory] = useState([]);
    const [currentResult, setCurrentResult] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('jd_analysis_history');
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const saveToHistory = (result) => {
        const updated = [result, ...history];
        setHistory(updated);
        localStorage.setItem('jd_analysis_history', JSON.stringify(updated));
    };

    const handleAnalyze = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const company = fd.get('company');
        const role = fd.get('role');
        const jdText = fd.get('jdText');

        const result = processJD(company, role, jdText);
        saveToHistory(result);
        setCurrentResult(result);
        setActiveTab('results');
        e.target.reset(); // clear form
    };

    const viewHistoryItem = (item) => {
        setCurrentResult(item);
        setActiveTab('results');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Assessments & Analysis</h2>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('analyze')}
                        className={cn("px-4 py-2 text-sm font-medium transition-colors rounded-md", activeTab === 'analyze' || activeTab === 'results' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900")}
                    >
                        Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={cn("px-4 py-2 text-sm font-medium transition-colors rounded-md", activeTab === 'history' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900")}
                    >
                        History
                    </button>
                </div>
            </div>

            {activeTab === 'analyze' && (
                <Card className="max-w-3xl border border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <FileSearch className="w-5 h-5 text-primary" />
                            Analyze Job Description
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">Paste your target job description to verify your readiness and generate a targeted preparation plan.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAnalyze} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Company Name</label>
                                    <input name="company" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm" placeholder="e.g. Google" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Role</label>
                                    <input name="role" type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm" placeholder="e.g. Frontend Engineer" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Job Description</label>
                                <textarea name="jdText" required rows={8} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-y" placeholder="Paste the full job description here..."></textarea>
                                <p className="text-xs text-gray-400 font-medium">Providing a detailed description (>800 chars) increases analysis accuracy.</p>
                            </div>
                            <button type="submit" className="w-full bg-primary hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm flex items-center justify-center gap-2">
                                <FileSearch className="w-4 h-4" /> Generate Preperation Plan
                            </button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'history' && (
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm max-w-3xl">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">No Assessment History</h3>
                            <p className="text-gray-500 mt-1 max-w-sm mx-auto text-sm">Analyze a job description to track your readiness and view generated prep strategies here.</p>
                            <button onClick={() => setActiveTab('analyze')} className="mt-6 text-primary font-semibold hover:underline text-sm">
                                Run your first analysis &rarr;
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {history.map((item) => (
                                <Card key={item.id} className="cursor-pointer hover:border-primary/40 transition-all shadow-sm hover:shadow-md group" onClick={() => viewHistoryItem(item)}>
                                    <CardContent className="p-5 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-3 gap-3">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">{item.role}</h4>
                                                    <p className="text-sm text-gray-500 font-medium line-clamp-1">{item.company}</p>
                                                </div>
                                                <div className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/20 shrink-0">
                                                    {item.readinessScore}/100
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {Object.keys(item.extractedSkills).slice(0, 3).map((cat, i) => (
                                                    <span key={i} className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                                        {cat}
                                                    </span>
                                                ))}
                                                {Object.keys(item.extractedSkills).length > 3 && <span className="text-[10px] text-gray-400 font-bold uppercase bg-gray-100 px-1.5 py-0.5 rounded">+{Object.keys(item.extractedSkills).length - 3}</span>}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                            <span className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform">Review <ChevronRight className="w-3 h-3 ml-0.5" /></span>
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'results' && currentResult && (
                <div className="space-y-6 max-w-[1200px]">
                    <button onClick={() => { setActiveTab('analyze'); setCurrentResult(null); }} className="flex items-center text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1.5" /> Start New Analysis
                    </button>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-[6px] border-l-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight tracking-tight">{currentResult.role}</h3>
                            <p className="text-lg text-gray-600 font-medium mt-1 flex items-center gap-2">
                                <span className="bg-gray-100/80 px-2 py-0.5 rounded text-gray-500">{currentResult.company}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm">Analyzed on {new Date(currentResult.createdAt).toLocaleDateString()}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-50 px-5 py-3 rounded-xl border border-gray-200 shrink-0 relative z-10">
                            <div className="text-sm font-bold text-gray-500 tracking-wide">READINESS<br />SCORE</div>
                            <div className="text-4xl font-black text-primary flex items-baseline">
                                {currentResult.readinessScore}
                                <span className="text-lg text-gray-400 font-bold ml-0.5">/100</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="shadow-sm border border-gray-100 overflow-hidden">
                                <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <ListChecks className="w-5 h-5 text-primary" /> Key Skills Extracted
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-6">
                                        {Object.entries(currentResult.extractedSkills).map(([category, skills]) => (
                                            <div key={category}>
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">{category}</h4>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {skills.map((skill, idx) => (
                                                        <span key={idx} className="bg-primary/5 border border-primary/20 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm border border-gray-100">
                                <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-primary" /> Likely Interview Questions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-4">
                                        {currentResult.questions.map((q, idx) => (
                                            <li key={idx} className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-gray-700 font-medium leading-relaxed">{q}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="shadow-sm border border-gray-100">
                                <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary" /> 7-Day Plan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-5">
                                    {currentResult.plan.map((dayPlan, idx) => (
                                        <div key={idx} className="relative pl-5 border-l-2 border-primary/20 pb-3 last:border-0 last:pb-0 group">
                                            <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full -left-[7.5px] top-1 group-hover:scale-125 transition-transform"></div>
                                            <h5 className="font-bold text-sm text-gray-800">{dayPlan.day} <span className="text-primary font-medium px-2">—</span> {dayPlan.title}</h5>
                                            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{dayPlan.description}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm border border-gray-100 bg-gray-900 text-white">
                                <CardHeader className="pb-4 border-b border-gray-800">
                                    <CardTitle className="text-lg flex items-center gap-2 text-white">
                                        <CheckCircle2 className="w-5 h-5 text-gray-400" /> Round-wise Checklist
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    {currentResult.checklist.map((roundInfo, idx) => (
                                        <div key={idx}>
                                            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">{roundInfo.round}</h5>
                                            <ul className="space-y-2.5 pl-1">
                                                {roundInfo.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                        <span className="text-sm text-gray-300">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
