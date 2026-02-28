import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileCode2, ClipboardCheck, BookOpen, UserCircle, Bell } from 'lucide-react';

function DashboardLayout() {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Practice', path: '/dashboard/practice', icon: FileCode2 },
        { name: 'Assessments', path: '/dashboard/assessments', icon: ClipboardCheck },
        { name: 'Resources', path: '/dashboard/resources', icon: BookOpen },
        { name: 'Profile', path: '/dashboard/profile', icon: UserCircle },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Placement<span className="text-primary">Prep</span></h2>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </aside>

            {/* Main Content wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
                    <h1 className="text-xl font-semibold text-gray-800">Placement Prep</h1>

                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-primary transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-9 w-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold border border-primary/30 cursor-pointer">
                            U
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
