import React, { useState, useEffect } from 'react';
import { processJD } from '../utils/analyzer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { FileSearch, Clock, ChevronRight, CheckCircle2, ListChecks, Calendar, MessageSquare, ArrowLeft, Copy, Download, AlertCircle } from 'lucide-react';

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

    const updateSkillStatus = (skill, status) => {
        if (!currentResult) return;

        const newMap = { ...currentResult.skillConfidenceMap, [skill]: status };

        let newScore = currentResult.baseScore;
        Object.values(newMap).forEach(val => {
            newScore += (val === "know" ? 2 : -2);
        });
        newScore = Math.max(0, Math.min(newScore, 100));

        const updatedResult = {
            ...currentResult,
            skillConfidenceMap: newMap,
            readinessScore: newScore
        };

        setCurrentResult(updatedResult);

        const updatedHistory = history.map(item => item.id === updatedResult.id ? updatedResult : item);
        setHistory(updatedHistory);
        localStorage.setItem('jd_analysis_history', JSON.stringify(updatedHistory));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyPlan = () => {
        const text = currentResult.plan.map(p => `${p.day} - ${p.title}\n${p.description}`).join('\n\n');
        copyToClipboard("7-Day Preparation Plan:\n\n" + text);
    };

    const copyChecklist = () => {
        const text = currentResult.checklist.map(c => `${c.round}\n` + c.items.map(i => `- ${i}`).join('\n')).join('\n\n');
        copyToClipboard("Round-wise Checklist:\n\n" + text);
    };

    const copyQuestions = () => {
        const text = currentResult.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
        copyToClipboard("Likely Interview Questions:\n\n" + text);
    };

    const downloadTXT = () => {
        const text = `Role: ${currentResult.role} at ${currentResult.company}
Readiness Score: ${currentResult.readinessScore}/100

KEY SKILLS
${Object.entries(currentResult.extractedSkills).map(([cat, skills]) => `${cat}: ${skills.join(', ')}`).join('\n')}

7-DAY PLAN
${currentResult.plan.map(p => `${p.day} - ${p.title}\n${p.description}`).join('\n\n')}

ROUND-WISE CHECKLIST
${currentResult.checklist.map(c => `${c.round}\n` + c.items.map(i => `- ${i}`).join('\n')).join('\n\n')}

RECOMMENDED QUESTIONS
${currentResult.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentResult.company}_Prep_Plan.txt`;
        a.click();
        URL.revokeObjectURL(url);
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
                                <p className="text-xs text-gray-400 font-medium">Providing a detailed description (&gt;800 chars) increases analysis accuracy.</p>
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
                                                <div className="flex flex-col gap-3">
                                                    {skills.map((skill, idx) => {
                                                        const status = currentResult.skillConfidenceMap?.[skill] || "practice";
                                                        return (
                                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-lg p-2 gap-3 shadow-sm">
                                                                <span className="font-semibold text-gray-800 text-sm px-2">{skill}</span>
                                                                <div className="flex bg-gray-100 rounded-md p-0.5">
                                                                    <button
                                                                        onClick={() => updateSkillStatus(skill, "know")}
                                                                        className={cn("px-3 py-1.5 text-xs font-bold rounded-sm transition-colors", status === "know" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
                                                                    >
                                                                        I know this
                                                                    </button>
                                                                    <button
                                                                        onClick={() => updateSkillStatus(skill, "practice")}
                                                                        className={cn("px-3 py-1.5 text-xs font-bold rounded-sm transition-colors", status === "practice" ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
                                                                    >
                                                                        Need practice
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
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

                    <div className="flex flex-col md:flex-row gap-6 mt-6">
                        <Card className="flex-1 shadow-sm border border-gray-100 overflow-hidden bg-primary/5">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Action Next</h4>
                                        <p className="text-sm text-gray-700 mt-1">Start your Day 1 plan now. Focus on revising your weaker concepts before advancing.</p>
                                        <div className="mt-4 flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Top Priorities:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(currentResult.skillConfidenceMap || {})
                                                    .filter(([_, status]) => status === "practice")
                                                    .map(([s]) => s)
                                                    .slice(0, 3)
                                                    .map((skill, i) => (
                                                        <span key={i} className="text-xs font-bold bg-white border border-primary/20 text-primary px-2.5 py-1 rounded-md shadow-sm">
                                                            {skill}
                                                        </span>
                                                    ))
                                                }
                                                {Object.values(currentResult.skillConfidenceMap || {}).every(s => s === "know") && (
                                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-md">All skills covered! Proceed to mock tests.</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shrink-0 md:w-64 shadow-sm border border-gray-100 flex flex-col justify-center bg-gray-50">
                            <CardContent className="p-6 flex flex-col gap-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Export Tools</h4>
                                <div className="space-y-3">
                                    <button onClick={copyPlan} className="w-full text-left text-sm font-semibold text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                        <Copy className="w-4 h-4" /> Copy 7-Day Plan
                                    </button>
                                    <button onClick={copyChecklist} className="w-full text-left text-sm font-semibold text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                        <Copy className="w-4 h-4" /> Copy Round Checklist
                                    </button>
                                    <button onClick={copyQuestions} className="w-full text-left text-sm font-semibold text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                                        <Copy className="w-4 h-4" /> Copy 10 Questions
                                    </button>
                                </div>
                                <button onClick={downloadTXT} className="w-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-primary hover:bg-gray-50 rounded-lg py-2 flex items-center justify-center gap-2 transition-colors mt-2">
                                    <Download className="w-4 h-4" /> Download TXT
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
