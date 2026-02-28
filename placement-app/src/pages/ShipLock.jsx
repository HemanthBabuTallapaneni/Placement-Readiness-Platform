import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Rocket, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ShipLock() {
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const passedCount = Object.values(parsed).filter(Boolean).length;
                if (passedCount === 10) {
                    setIsLocked(false);
                }
            } catch (e) {
                console.error("Error reading checklist state:", e);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto text-center space-y-6">
                <div className="bg-red-50 p-6 rounded-full inline-block mb-2 border-8 border-red-50/50">
                    <Lock className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shipping Locked</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                    You cannot ship this version yet. Fix issues before shipping. All 10 pre-flight tests must be verified and checked off.
                </p>
                <button
                    onClick={() => navigate('/prp/07-test')}
                    className="mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Test Checklist
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-4">
                <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-green-100">
                    <Rocket className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Ready to Ship!</h2>
                <p className="text-lg text-gray-500 font-medium">All 10 pre-flight verification checks have passed successfully.</p>
            </div>

            <Card className="border-green-100 bg-green-50/30 shadow-none">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                    <h3 className="text-xl font-bold text-gray-800">Version 1.0 Validated</h3>
                    <p className="text-gray-600">The Placement Readiness Platform core features, data models, error boundaries, and aesthetic systems are operating within expected parameters.</p>
                </CardContent>
            </Card>
        </div>
    );
}
