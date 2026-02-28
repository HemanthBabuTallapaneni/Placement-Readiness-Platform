import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Video, LineChart } from 'lucide-react';

function Landing() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-primary text-white py-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold mb-6">Ace Your Placement</h1>
                        <p className="text-xl mb-10 opacity-90">Practice, assess, and prepare for your dream job</p>
                        <Link to="/dashboard" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 px-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-6">
                                <Code className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Practice Problems</h3>
                            <p className="text-gray-600">Solve curated coding challenges to sharpen your technical skills.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-6">
                                <Video className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Mock Interviews</h3>
                            <p className="text-gray-600">Experience real-world behavioral and technical interview scenarios.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-6">
                                <LineChart className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Track Progress</h3>
                            <p className="text-gray-600">Monitor your performance insights and identify areas for improvement.</p>
                        </div>

                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
                &copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
            </footer>
        </div>
    );
}

export default Landing;
