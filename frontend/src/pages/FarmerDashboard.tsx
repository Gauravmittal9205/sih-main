import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, LayoutDashboard, Bell, FileText, CheckCircle, HelpCircle, LogOut, User as UserIcon, Menu, Droplet, Wheat, Recycle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FarmerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const Sidebar = (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-full hidden md:flex flex-col">
      <div className="h-16 flex items-center px-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-teal-600 to-blue-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800">Farm Rakshaa</span>
        </div>
      </div>
      
      {/* Farmer Profile Section */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">organic farm</div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
            {user?.name?.charAt(0) || 'F'}
          </div>
          <div className="text-sm text-gray-600 mb-1">Welcome back,</div>
          <div className="text-lg font-bold text-gray-900 mb-3">{user?.name || 'Farmer Name'}</div>
          <div className="text-xs text-gray-500">ID: {user?._id?.slice(-6) || 'FARM001'}</div>
          <div className="text-xs text-gray-500">Village: {user?.email?.split('@')[0] || 'Village Name'}</div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <Link to="/farmer" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700">
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link to="/alerts" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700">
          <Bell className="h-5 w-5" />
          <span>Alerts</span>
        </Link>
        <Link to="/resources" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700">
          <FileText className="h-5 w-5" />
          <span>Resources</span>
        </Link>
        <Link to="/compliance" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700">
          <CheckCircle className="h-5 w-5" />
          <span>Compliance</span>
        </Link>
        <Link to="/training" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700">
          <HelpCircle className="h-5 w-5" />
          <span>Training</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="space-y-2">
          <Link to="/faqs" className="flex items-center space-x-2 text-gray-700 hover:text-teal-700">
            <HelpCircle className="h-4 w-4" />
            <span>FAQs</span>
          </Link>
          <Link to="/feedback" className="flex items-center space-x-2 text-gray-700 hover:text-teal-700">
            <span className="inline-block w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] leading-4 text-center">✍</span>
            <span>Feedback</span>
          </Link>
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 text-xs text-gray-400">© {new Date().getFullYear()} Farm Rakshaa</div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex items-stretch">
        {Sidebar}

        {/* Mobile sidebar trigger */}
        <button
          className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white shadow border border-gray-200"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>

        {/* Mobile sidebar drawer */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileSidebarOpen(false)} />
            <div className="relative w-64 h-full bg-white border-r border-gray-200">
              <div className="h-16 flex items-center px-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-br from-teal-600 to-blue-600 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-lg text-gray-800">Farm Rakshaa</span>
                </div>
              </div>
              
              {/* Farmer Profile Section - Mobile */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">organic farm</div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
                    {user?.name?.charAt(0) || 'F'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Welcome back,</div>
                  <div className="text-lg font-bold text-gray-900 mb-3">{user?.name || 'Farmer Name'}</div>
                  <div className="text-xs text-gray-500">ID: {user?._id?.slice(-6) || 'FARM001'}</div>
                  <div className="text-xs text-gray-500">Village: {user?.email?.split('@')[0] || 'Village Name'}</div>
                </div>
              </div>
              
              <nav className="p-4 space-y-1">
                <Link to="/farmer" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700" onClick={() => setIsMobileSidebarOpen(false)}>
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/alerts" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700" onClick={() => setIsMobileSidebarOpen(false)}>
                  <Bell className="h-5 w-5" />
                  <span>Alerts</span>
                </Link>
                <Link to="/resources" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700" onClick={() => setIsMobileSidebarOpen(false)}>
                  <FileText className="h-5 w-5" />
                  <span>Resources</span>
                </Link>
                <Link to="/compliance" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700" onClick={() => setIsMobileSidebarOpen(false)}>
                  <CheckCircle className="h-5 w-5" />
                  <span>Compliance</span>
                </Link>
                <Link to="/training" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-700" onClick={() => setIsMobileSidebarOpen(false)}>
                  <HelpCircle className="h-5 w-5" />
                  <span>Training</span>
                </Link>
              </nav>
              <div className="p-4 border-t border-gray-100">
                <Link to="/faqs" className="flex items-center space-x-2 text-gray-700 hover:text-teal-700" onClick={() => setIsMobileSidebarOpen(false)}>
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQs</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 min-h-screen">
          <div className="h-16 flex items-center justify-end px-6">
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((v) => !v)}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow transition"
              >
                <UserIcon className="h-5 w-5 text-gray-700" />
                <span className="text-sm text-gray-700">{user?.name || 'Profile'}</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b">Signed in as<br /><span className="font-medium text-gray-800">{user?.email || 'farmer@example.com'}</span></div>
                  <Link to="#" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button onClick={logout} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 pb-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
              <p className="text-gray-600 mb-6">Here is your farmer dashboard overview.</p>

              {/* Stats - Biosecurity Score, Livestock Count, Vaccination Progress */}
              <DashboardStats />
            </div>
          </div>
        </div>
      </div>
      {/* Recent vaccinations table */}
      <div className="mt-4 bg-white/60 rounded-lg border border-blue-100">
        <div className="px-4 py-2 text-sm font-medium text-blue-900">Last Vaccinations</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-blue-100/60 text-blue-900">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Date</th>
                <th className="text-left px-4 py-2 font-medium">Animal ID</th>
                <th className="text-left px-4 py-2 font-medium">Species</th>
                <th className="text-left px-4 py-2 font-medium">Vaccine</th>
                <th className="text-left px-4 py-2 font-medium">Dose</th>
                <th className="text-left px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-08-28', animalId: 'C-1023', species: 'Cattle', vaccine: 'FMD', dose: 'Booster', status: 'Done' },
                { date: '2025-08-26', animalId: 'G-221', species: 'Goat', vaccine: 'PPR', dose: '1st', status: 'Done' },
                { date: '2025-08-24', animalId: 'P-554', species: 'Poultry', vaccine: 'NDV', dose: '2nd', status: 'Pending' },
                { date: '2025-08-20', animalId: 'B-18', species: 'Buffalo', vaccine: 'Brucellosis', dose: '1st', status: 'Done' },
              ].map((r) => (
                <tr key={`${r.date}-${r.animalId}`} className="border-t border-blue-100">
                  <td className="px-4 py-2 text-blue-900">{r.date}</td>
                  <td className="px-4 py-2 text-blue-900">{r.animalId}</td>
                  <td className="px-4 py-2 text-blue-900">{r.species}</td>
                  <td className="px-4 py-2 text-blue-900">{r.vaccine}</td>
                  <td className="px-4 py-2 text-blue-900">{r.dose}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${r.status === 'Done' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

const LivestockSummaryPanel: React.FC<{ total: number }> = ({ total }) => {
  const stats = [
    { label: 'Total Collars', value: 400, delta: '+1.01% this week', trend: 'up', icon: '🪙' },
    { label: 'Total Livestock', value: total, delta: '+0.49% this week', trend: 'up', icon: '🐄' },
    { label: 'Safe Livestock', value: Math.max(0, total - 80), delta: '-0.91% this week', trend: 'down', icon: '✅' },
    { label: 'Unsafe Livestock', value: Math.min(80, total), delta: '+1.51% this week', trend: 'up', icon: '🚫' },
  ];
  return (
    <div className="mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        <div className="md:col-span-2">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1200&auto=format&fit=crop"
            alt="Livestock"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 px-4 py-3 bg-white hover:shadow transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{s.label}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-lg">{s.icon}</div>
              </div>
              <div className={`mt-2 text-xs ${s.trend === 'up' ? 'text-emerald-600' : 'text-red-600'} flex items-center space-x-1`}>
                <span>{s.trend === 'up' ? '↗' : '↘'}</span>
                <span>{s.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government & Vet Advisories */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Vaccination Camp</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">Free vaccination camp</div>
              <div className="mt-1 text-xs text-gray-600">Agle hafte block hospital me free vaccination camp hai.</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg">💉</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Pest Control Advisory</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">State advisory issued</div>
              <div className="mt-1 text-xs text-gray-600">State agriculture department ne peste control advisory jaari ki hai.</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-lg">🐛</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-5 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Annual Health Check</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">Mandatory requirement</div>
              <div className="mt-1 text-xs text-gray-600">Pashuon ka annual health check-up karwana mandatory hai.</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-lg">🏥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Awareness & Training Highlights */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 mx-6">
        <div className="text-lg font-semibold text-gray-800">Awareness & Training Highlights</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 p-4 bg-blue-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-lg">🎥</span>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-800">Video</div>
                <div className="text-xs text-blue-600">2 min</div>
              </div>
            </div>
            <div className="text-sm text-blue-900">Poultry shed ki sahi safai ka tarika</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-green-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-lg">📖</span>
              </div>
              <div>
                <div className="text-sm font-medium text-green-800">Article</div>
                <div className="text-xs text-green-600">Guide</div>
              </div>
            </div>
            <div className="text-sm text-green-900">Pashuon ki vaccination schedule ko kaise follow karein</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 bg-amber-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 text-lg">📋</span>
              </div>
              <div>
                <div className="text-sm font-medium text-amber-800">Poster</div>
                <div className="text-xs text-amber-600">Protocol</div>
              </div>
            </div>
            <div className="text-sm text-amber-900">Farm visitors ke liye hygiene protocol</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 bg-black border-t border-gray-700 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-teal-600 to-blue-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-white">Farm Rakshaa</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Empowering farmers with digital tools for better biosecurity, livestock management, and sustainable farming practices.
              </p>
              <div className="flex space-x-4">
                <span className="text-gray-400 hover:text-teal-400 cursor-pointer">📧</span>
                <span className="text-gray-400 hover:text-teal-400 cursor-pointer">📱</span>
                <span className="text-gray-400 hover:text-teal-400 cursor-pointer">🌐</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/alerts" className="hover:text-teal-400">Alerts</Link></li>
                <li><Link to="/resources" className="hover:text-teal-400">Resources</Link></li>
                <li><Link to="/training" className="hover:text-teal-400">Training</Link></li>
                <li><Link to="/faqs" className="hover:text-teal-400">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/feedback" className="hover:text-teal-400">Feedback</Link></li>
                <li className="hover:text-teal-400 cursor-pointer">Emergency Contact</li>
                <li className="hover:text-teal-400 cursor-pointer">Vet Directory</li>
                <li className="hover:text-teal-400 cursor-pointer">Help Center</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Farm Rakshaa. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span className="hover:text-teal-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-teal-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-teal-400 cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const [biosecurityScore] = React.useState<number>(76);
  const [livestockCount] = React.useState<number>(120);
  const [vaccinationProgress] = React.useState<number>(62);

  const scoreColor = biosecurityScore >= 80 ? 'text-green-700 bg-green-50 border-green-200' : biosecurityScore >= 50 ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-red-700 bg-red-50 border-red-200';

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Biosecurity Score (Bar Graph) */}
        <div className={`p-5 rounded-lg border ${scoreColor}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Biosecurity Score</h3>
            <div className="text-xs px-2 py-1 rounded-full border">
              {biosecurityScore >= 80 ? 'Good' : biosecurityScore >= 50 ? 'Moderate' : 'High Risk'}
            </div>
          </div>
          <div className="mt-3">
            <BiosecurityVerticalBarChart
              data={[
                { label: 'Hygiene', value: 80 },
                { label: 'Access Control', value: 72 },
                { label: 'Quarantine', value: 65 },
                { label: 'Pest Control', value: 58 },
                { label: 'Waste Mgmt', value: 85 },
              ]}
            />
            <div className="mt-3 text-sm font-semibold">Overall: {biosecurityScore}</div>
            <p className="mt-1 text-xs text-gray-600">Improve lower-scoring categories to raise overall score.</p>
            <BiosecurityDetails />
          </div>
        </div>

        {/* Vaccination overview (replacing current livestock in this section) */}
        <LivestockOverview vaccination={vaccinationProgress} total={livestockCount} />
      </div>

      {/* Livestock summary panel (replaces vaccination box) */}
      <LivestockSummaryPanel total={livestockCount} />
    </div>
  );
};

export default FarmerDashboard;

type BarDatum = { label: string; value: number };

const BiosecurityVerticalBarChart: React.FC<{ data: BarDatum[] }> = ({ data }) => {
  const maxValue = Math.max(100, ...data.map((d) => d.value));
  const viewWidth = 560; // px in viewBox
  const viewHeight = 260;
  const margin = { top: 20, right: 20, bottom: 50, left: 40 };
  const innerWidth = viewWidth - margin.left - margin.right;
  const innerHeight = viewHeight - margin.top - margin.bottom;
  const barWidth = innerWidth / data.length - 14; // spacing between bars

  const yTicks = [0, 20, 40, 60, 80, 100];

  const getBarColor = (v: number) => (v >= 80 ? '#22c55e' : v >= 50 ? '#f59e0b' : '#ef4444');

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = React.useState<{ i: number; x: number; y: number } | null>(null);
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const getTooltipPosition = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { left: clientX, top: clientY };
    return { left: clientX - rect.left + 8, top: clientY - rect.top - 36 };
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="w-full h-56">
        <defs>
          <filter id="barShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Y grid lines and labels */}
          {yTicks.map((t) => {
            const y = innerHeight - (t / maxValue) * innerHeight;
            return (
              <g key={t}>
                <line x1={0} x2={innerWidth} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={1} />
                <text x={-8} y={y + 4} textAnchor="end" fontSize={10} fill="#6b7280">{t}</text>
              </g>
            );
          })}

          {/* X axis */}
          <line x1={0} x2={innerWidth} y1={innerHeight} y2={innerHeight} stroke="#9ca3af" strokeWidth={1} />

          {/* Bars */}
          {data.map((d, i) => {
            const x = i * (innerWidth / data.length) + 7;
            const targetHeight = (d.value / maxValue) * innerHeight;
            const barHeight = animate ? targetHeight : 0;
            const y = innerHeight - barHeight;
            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={getBarColor(d.value)}
                  rx={4}
                  filter="url(#barShadow)"
                  style={{ transition: 'height 600ms ease, y 600ms ease', cursor: 'pointer', opacity: hover?.i === i ? 0.9 : 1 }}
                  onMouseEnter={(e) => setHover({ i, x: (e as any).clientX, y: (e as any).clientY })}
                  onMouseMove={(e) => setHover({ i, x: (e as any).clientX, y: (e as any).clientY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x={x + barWidth / 2} y={innerHeight + 16} textAnchor="middle" fontSize={10} fill="#374151">{d.label}</text>
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={10} fill="#111827">{d.value}</text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text x={innerWidth / 2} y={innerHeight + 36} textAnchor="middle" fontSize={12} fill="#374151">Category</text>
          <text transform={`rotate(-90)`} x={-innerHeight / 2} y={-28} textAnchor="middle" fontSize={12} fill="#374151">Score</text>
        </g>
      </svg>
      {hover && (
        <div
          className="pointer-events-none absolute bg-white border border-gray-200 shadow-lg rounded-md px-2 py-1 text-xs text-gray-800"
          style={getTooltipPosition(hover.x, hover.y)}
        >
          <div className="font-medium">{data[hover.i].label}</div>
          <div>Score: {data[hover.i].value}</div>
        </div>
      )}
    </div>
  );
};

const VaccinationMiniTrend: React.FC<{ data: number[] }> = ({ data }) => {
  const w = 240;
  const h = 60;
  const min = 0;
  const max = 100;
  const dx = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * dx;
      const y = h - (v - min) / (max - min) * h;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-56 h-16">
      <polyline points={points} fill="none" stroke="#10b981" strokeWidth={2} />
      {data.map((v, i) => {
        const x = i * dx;
        const y = h - (v - min) / (max - min) * h;
        return <circle key={i} cx={x} cy={y} r={2} fill="#10b981" />;
      })}
    </svg>
  );
};

const BiosecurityDetails: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const trend = [65, 67, 69, 70, 72, 74, 73, 75, 76];

  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <button onClick={() => setOpen((o) => !o)} className="text-xs text-teal-700 font-medium hover:underline">
        {open ? 'Hide' : 'Show'} biosecurity details
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/70 border border-gray-100 rounded-lg p-3">
            <div className="text-xs text-gray-700 mb-2 font-medium">Score Trend (last 9 checks)</div>
            <Sparkline data={trend} />
          </div>
          <div className="bg-white/70 border border-gray-100 rounded-lg p-3">
            <div className="text-xs text-gray-700 mb-2 font-medium">Category Strength</div>
            <div className="space-y-2">
              {[
                { k: 'Hygiene', v: 80, c: 'bg-emerald-500' },
                { k: 'Access Control', v: 72, c: 'bg-blue-500' },
                { k: 'Quarantine', v: 65, c: 'bg-amber-500' },
                { k: 'Pest Control', v: 58, c: 'bg-red-500' },
                { k: 'Waste Mgmt', v: 85, c: 'bg-indigo-500' },
              ].map((row) => (
                <div key={row.k} className="text-xs text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>{row.k}</span>
                    <span className="font-medium">{row.v}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div className={`h-full ${row.c}`} style={{ width: `${row.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 bg-white/70 border border-gray-100 rounded-lg p-3">
            <div className="text-xs text-gray-700 mb-2 font-medium">Recommended Actions</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="text-gray-700">
                  <tr>
                    <th className="text-left py-2">Area</th>
                    <th className="text-left py-2">Action</th>
                    <th className="text-left py-2">Priority</th>
                    <th className="text-left py-2">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { area: 'Pest Control', action: 'Schedule rodent control', pr: 'High', eta: '2 days' },
                    { area: 'Quarantine', action: 'Update isolation signage', pr: 'Medium', eta: '1 week' },
                    { area: 'Access Control', action: 'Rotate passwords / badges', pr: 'Low', eta: '2 weeks' },
                  ].map((r, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="py-2">{r.area}</td>
                      <td className="py-2">{r.action}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${r.pr === 'High' ? 'bg-red-100 text-red-700' : r.pr === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.pr}</span>
                      </td>
                      <td className="py-2">{r.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const w = 260;
  const h = 60;
  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const dx = w / (data.length - 1);
  const points = data.map((v, i) => `${i * dx},${h - ((v - min) / (max - min)) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
      <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth={2} />
    </svg>
  );
};

const WeeklyRiskChart: React.FC = () => {
  const w = 320; const h = 160; const weeks = ['W1','W2','W3','W4','W5','W6'];
  const farm = [12, 18, 15, 22, 17, 14];
  const region = [15, 17, 16, 20, 19, 18];
  const max = 30; const dx = w/(weeks.length-1);
  const toPts = (arr:number[]) => arr.map((v,i)=>`${i*dx},${h-(v/max)*h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <polyline points={toPts(region)} fill="none" stroke="#94a3b8" strokeWidth={2} />
      <polyline points={toPts(farm)} fill="none" stroke="#2563eb" strokeWidth={2} />
      {weeks.map((wk,i)=> (
        <text key={wk} x={i*dx} y={h-2} fontSize={10} fill="#6b7280" textAnchor="middle">{wk}</text>
      ))}
      <rect x={8} y={8} width={10} height={4} fill="#2563eb" />
      <text x={24} y={11} fontSize={10} fill="#374151">Farm</text>
      <rect x={70} y={8} width={10} height={4} fill="#94a3b8" />
      <text x={86} y={11} fontSize={10} fill="#374151">Region</text>
    </svg>
  );
};

const VaccinationMortalityChart: React.FC = () => {
  const w = 320; const h = 160; const n = 8; const dx = w/(n-1);
  const vaccination = [50,55,58,60,63,66,68,70];
  const mortality = [4.0,3.8,3.6,3.5,3.3,3.2,3.0,2.9]; // %
  const vMax = 100; const mMax = 6; 
  const vPts = vaccination.map((v,i)=>`${i*dx},${h-(v/vMax)*h}`).join(' ');
  const mPts = mortality.map((v,i)=>`${i*dx},${h-(v/mMax)*h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <polyline points={vPts} fill="none" stroke="#10b981" strokeWidth={2} />
      <polyline points={mPts} fill="none" stroke="#ef4444" strokeWidth={2} />
      <text x={8} y={12} fontSize={10} fill="#10b981">Vaccination %</text>
      <text x={120} y={12} fontSize={10} fill="#ef4444">Mortality %</text>
    </svg>
  );
};

const FeedCostCorrelation: React.FC = () => {
  const w = 320; const h = 160;
  const points = [
    { x: 20, y: 120 }, { x: 60, y: 100 }, { x: 90, y: 95 }, { x: 130, y: 80 },
    { x: 160, y: 70 }, { x: 200, y: 60 }, { x: 240, y: 58 }, { x: 280, y: 50 }
  ];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <rect x={0} y={0} width={w} height={h} fill="#f8fafc" />
      {points.map((p,i)=> (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#6366f1" />
      ))}
      <line x1={15} y1={130} x2={305} y2={45} stroke="#94a3b8" strokeDasharray="4 4" />
      <text x={8} y={12} fontSize={10} fill="#374151">Cost →</text>
      <text x={w-8} y={h-6} fontSize={10} fill="#374151" textAnchor="end">Health ↑</text>
    </svg>
  );
};

const LivestockOverview: React.FC<{ total: number; vaccination: number }> = ({ vaccination }) => {
  const farm = {
    name: 'Greenfield Dairy',
    location: 'Nashik, MH',
    areaAcre: 12.5,
  };
  // Build vaccination vs remaining arcs for donut
  const coverage = Math.max(0, Math.min(100, vaccination));
  // Placeholder to keep structure consistent (unused now)
  const trend = [48, 55, 61, 58, 64, 66, 69, 72, 74, 76, 78, vaccination];

  const [hoverKey, setHoverKey] = React.useState<string | null>(null);

  // Donut chart dimensions
  const size = 200;
  const radius = 80;
  const thickness = 18;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let startAngle = -Math.PI / 2;
  const segments = [
    { key: 'vaccinated', color: '#10b981', label: 'Vaccinated', value: coverage },
    { key: 'remaining', color: '#1d4ed8', label: 'Remaining', value: 100 - coverage },
  ];
  const arcs = segments.map((seg) => {
    const fraction = seg.value / 100;
    const angle = fraction * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const length = circumference * fraction;
    const arc = { key: seg.key, color: seg.color, length, start: startAngle, end: endAngle, value: seg.value, label: seg.label, fraction } as const;
    startAngle = endAngle;
    return arc;
  });

  return (
    <div className="p-5 rounded-lg border border-gray-100 bg-blue-50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-blue-800">Vaccination Overview</h3>
          <div className="mt-2 text-3xl font-semibold text-blue-900">{coverage}%</div>
          <div className="mt-1 text-xs text-blue-700">Coverage on {farm.name}</div>
          <div className="mt-3 text-xs text-blue-800">
            <div>Farm: <span className="font-medium">{farm.name}</span></div>
            <div>Location: <span className="font-medium">{farm.location}</span></div>
            <div>Area: <span className="font-medium">{farm.areaAcre} acres</span></div>
          </div>
          {/* Vaccination progress inline */}
          <div className="mt-4">
            <div className="text-xs font-medium text-emerald-800">Vaccination Progress</div>
            <div className="mt-2 w-56 h-3 bg-white border border-emerald-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${vaccination}%` }} />
            </div>
            <div className="mt-1 text-xs text-emerald-900 font-medium">{vaccination}%</div>
            <VaccinationMiniTrend data={trend} />
          </div>
        </div>
        <div className="relative">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-40 h-40">
            <g transform={`translate(${center},${center})`}>
              {/* Base ring */}
              <circle r={radius} fill="none" stroke="#e5e7eb" strokeWidth={thickness} />
              {/* Segments */}
              {arcs.map((a, idx) => (
                <circle
                  key={a.key}
                  r={radius}
                  fill="none"
                  stroke={a.color}
                  strokeWidth={thickness}
                  strokeDasharray={`${a.length} ${circumference - a.length}`}
                  strokeDashoffset={-circumference * (arcs.slice(0, idx).reduce((s, x) => s + x.fraction, 0))}
                  style={{ transition: 'opacity 200ms ease' }}
                  opacity={hoverKey && hoverKey !== a.key ? 0.4 : 1}
                  onMouseEnter={() => setHoverKey(a.key)}
                  onMouseLeave={() => setHoverKey(null)}
                />
              ))}
              {/* Center label */}
              <text textAnchor="middle" dominantBaseline="central" fontSize={20} fill="#1e3a8a" fontWeight={600}>{coverage}%</text>
            </g>
          </svg>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#10b981' }} />
              <span className="text-blue-900 font-medium">Vaccinated</span>
              <span className="text-blue-800">{coverage}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#1d4ed8' }} />
              <span className="text-blue-900 font-medium">Remaining</span>
              <span className="text-blue-800">{(100 - coverage).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


