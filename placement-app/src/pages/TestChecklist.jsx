import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { CheckCircle2, Circle, AlertCircle, RefreshCw, LayoutList } from 'lucide-react';

const TESTS = [
    { id: "jd_val", text: "JD required validation works", hint: "Submit empty JD to test." },
    { id: "jd_short", text: "Short JD warning shows for <200 chars", hint: "Submit <200 chars to test." },
    { id: "ext_group", text: "Skills extraction groups correctly", hint: "Check UI tags against schema." },
    { id: "round_map", text: "Round mapping changes based on company + skills", hint: "Compare Google vs unknown startup." },
    { id: "score_det", text: "Score calculation is deterministic", hint: "Same input should give same score." },
    { id: "live_score", text: "Skill toggles update score live", hint: "Toggle 'I know this' and watch score." },
    { id: "persist", text: "Changes persist after refresh", hint: "Toggle, refresh page, check status." },
    { id: "history", text: "History saves and loads correctly", hint: "Check History tab." },
    { id: "export", text: "Export buttons copy the correct content", hint: "Click Export and paste." },
    { id: "no_err", text: "No console errors on core pages", hint: "Check DevTools console." }
];

export default function TestChecklist() {
    const [checklistData, setChecklistData] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) return JSON.parse(saved);
        const initial = {};
        TESTS.forEach(t => initial[t.id] = false);
        return initial;
    });

    useEffect(() => {
        localStorage.setItem('prp_test_checklist', JSON.stringify(checklistData));
    }, [checklistData]);

    const toggleTest = (id) => {
        setChecklistData(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const resetChecklist = () => {
        const initial = {};
        TESTS.forEach(t => initial[t.id] = false);
        setChecklistData(initial);
    };

    const passedCount = Object.values(checklistData).filter(Boolean).length;
    const allPassed = passedCount === TESTS.length;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <LayoutList className="w-6 h-6 text-primary" /> Test Checklist
                </h2>
                <div className={cn(
                    "px-4 py-2 rounded-lg border font-bold text-sm",
                    allPassed ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                )}>
                    Tests Passed: {passedCount} / {TESTS.length}
                </div>
            </div>

            {!allPassed && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-amber-600" />
                    <div>
                        <h4 className="font-bold">Shipping Locked</h4>
                        <p className="text-sm mt-1">Fix issues before shipping. All {TESTS.length} tests must be checked to unlock the ship route.</p>
                    </div>
                </div>
            )}

            <Card className="shadow-sm border border-gray-100">
                <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg">Pre-flight Verification</CardTitle>
                    <button
                        onClick={resetChecklist}
                        className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1.5 transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5" /> Reset checklist
                    </button>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-3">
                        {TESTS.map((test) => {
                            const isChecked = checklistData[test.id];
                            return (
                                <div
                                    key={test.id}
                                    onClick={() => toggleTest(test.id)}
                                    className={cn(
                                        "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                        isChecked ? "bg-primary/5 border-primary/20" : "bg-white border-gray-200 hover:border-gray-300"
                                    )}
                                >
                                    <div className="mt-0.5 shrink-0">
                                        {isChecked ? (
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-300" />
                                        )}
                                    </div>
                                    <div>
                                        <p className={cn("font-semibold text-sm transition-colors", isChecked ? "text-primary" : "text-gray-800")}>
                                            {test.text}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{test.hint}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
