import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, Info, ShieldAlert, Target } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await apiService.getOverview();
      setData(res.data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-neutral-200 animate-pulse rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-24 bg-neutral-200 animate-pulse rounded"></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 bg-neutral-200 animate-pulse rounded"></div>
          <div className="h-80 bg-neutral-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Maharashtra Skill Intelligence</h1>
          <p className="text-sm text-neutral-500 mt-1">Longitudinal outcomes across training, employment and livelihoods.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex bg-white border border-neutral-300 rounded shadow-sm text-sm overflow-hidden">
            <select className="pl-3 pr-8 py-2 border-r border-neutral-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option>Year: 2026</option>
              <option>Year: 2025</option>
            </select>
            <select className="pl-3 pr-8 py-2 border-r border-neutral-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option>All Districts</option>
              <option>Pune</option>
              <option>Nashik</option>
            </select>
            <select className="pl-3 pr-8 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option>All Sectors</option>
              <option>IT & ITES</option>
              <option>Healthcare</option>
            </select>
          </div>
          <button className="flex items-center px-3 py-2 bg-white border border-neutral-300 rounded shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            <Filter size={16} className="mr-2" /> More Filters
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-neutral-300 rounded shadow-sm text-sm font-medium text-neutral-700 hover:bg-neutral-50" title="Export Data">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <KpiCard label="Total Trainees" value={data.kpis.totalTrainees} />
        <KpiCard label="Certified" value={data.kpis.certified} />
        <KpiCard label="Employment Rate" value={data.kpis.employmentRate} />
        <KpiCard label="6M Retention" value={data.kpis.retention6M} />
        <KpiCard label="Median Wage" value={data.kpis.medianWage} />
        <div className="card p-4 flex flex-col justify-center border-l-4 border-l-primary-600 bg-primary-50/50">
          <span className="text-sm text-neutral-600 font-medium truncate mb-1">Impact Score</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-neutral-900">{data.kpis.impactScore}</span>
            <span className="text-sm font-medium text-neutral-500 ml-1">/100</span>
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District Performance Ranking */}
        <div className="card lg:col-span-2">
          <div className="border-b border-neutral-200 px-6 py-4 flex justify-between items-center bg-neutral-50/50 rounded-t-lg">
            <h2 className="text-base font-semibold text-neutral-900">District Performance Ranking</h2>
            <button className="text-xs text-primary-600 font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-500 bg-neutral-50 border-b border-neutral-200 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">District</th>
                  <th className="px-6 py-3 font-medium text-right">Trainees</th>
                  <th className="px-6 py-3 font-medium text-right">Employment</th>
                  <th className="px-6 py-3 font-medium text-right">Retention</th>
                  <th className="px-6 py-3 font-medium text-right">Median Wage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {data.districtRanking.map((dist: any, idx: number) => (
                  <tr key={dist.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-neutral-900 flex items-center">
                      <Target size={18} className="text-purple-600 mt-0.5 mr-2" />
                      <span className="text-neutral-400 mr-2">{idx + 1}.</span> {dist.name}
                    </td>
                    <td className="px-6 py-3 text-right text-neutral-600">{dist.trainees}</td>
                    <td className="px-6 py-3 text-right font-medium">
                      <span className={dist.employment > 70 ? 'text-green-600' : 'text-neutral-900'}>{dist.employment}%</span>
                    </td>
                    <td className="px-6 py-3 text-right text-neutral-600">{dist.retention}%</td>
                    <td className="px-6 py-3 text-right text-neutral-600">₹{dist.wage.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="card bg-white border border-primary-100 shadow-md">
          <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex items-center rounded-t-lg">
            <Info className="text-primary-600 mr-2" size={20} />
            <h2 className="text-base font-semibold text-primary-900 tracking-tight">SkillPulse AI Insight</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-neutral-700 leading-relaxed">
              Data Analytics courses show a significant <span className="font-semibold text-neutral-900">Power BI</span> and <span className="font-semibold text-neutral-900">SQL</span> skill gap across 4 districts. Employment outcomes for affected cohorts are <span className="font-semibold text-red-600">18% below</span> the state average.
            </p>
            <div className="mt-5">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Recommended Actions</h3>
              <ul className="space-y-2 text-sm text-neutral-800">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">→</span> Review curriculum
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">→</span> Add industry-led projects
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">→</span> Increase apprenticeship partnerships
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button className="text-sm text-primary-600 font-medium hover:underline focus:outline-none">View detailed analysis</button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="border-b border-neutral-200 px-6 py-4 bg-neutral-50/50 rounded-t-lg">
            <h2 className="text-base font-semibold text-neutral-900">Employment Trend</h2>
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.employmentTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} />
                <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{borderRadius: '4px', border: '1px solid #e5e5e5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}}
                  labelStyle={{color: '#737373', fontSize: '12px'}}
                  itemStyle={{color: '#171717', fontSize: '14px', fontWeight: 500}}
                />
                <Area type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="border-b border-neutral-200 px-6 py-4 bg-neutral-50/50 rounded-t-lg">
            <h2 className="text-base font-semibold text-neutral-900">Retention Curve</h2>
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.retentionCurve} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{borderRadius: '4px', border: '1px solid #e5e5e5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}}
                />
                <Line type="monotone" dataKey="rate" stroke="#0284c7" strokeWidth={2} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Third Row: Course Performance */}
      <div className="card">
        <div className="border-b border-neutral-200 px-6 py-4 flex justify-between items-center bg-neutral-50/50 rounded-t-lg">
          <h2 className="text-base font-semibold text-neutral-900">Course Performance</h2>
          <button className="text-xs text-primary-600 font-medium hover:underline">View Directory</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 bg-neutral-50 border-b border-neutral-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium text-right">Enrolled</th>
                <th className="px-6 py-3 font-medium text-right">Certified</th>
                <th className="px-6 py-3 font-medium text-right">Employment</th>
                <th className="px-6 py-3 font-medium text-right">6M Retention</th>
                <th className="px-6 py-3 font-medium text-right">Median Wage</th>
                <th className="px-6 py-3 font-medium text-right">Impact Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {data.coursePerformance.map((course: any) => (
                <tr key={course.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-neutral-900">{course.name}</td>
                  <td className="px-6 py-3 text-right text-neutral-600">{course.enrolled}</td>
                  <td className="px-6 py-3 text-right text-neutral-600">{course.certified}</td>
                  <td className="px-6 py-3 text-right text-neutral-600">{course.employment}</td>
                  <td className="px-6 py-3 text-right text-neutral-600">{course.retention}</td>
                  <td className="px-6 py-3 text-right text-neutral-600">{course.wage}</td>
                  <td className="px-6 py-3 text-right font-medium">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${course.impact >= 80 ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'}`}>
                      {course.impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fourth Row: Skill Gap Intelligence */}
      <div className="card">
        <div className="border-b border-neutral-200 px-6 py-4 flex items-center bg-neutral-50/50 rounded-t-lg">
          <Target className="text-neutral-500 mr-2" size={18} />
          <div>
            <h2 className="text-base font-semibold text-neutral-900">Skill Gap Intelligence</h2>
            <p className="text-xs text-neutral-500">Where training supply does not match industry demand.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 bg-neutral-50 border-b border-neutral-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Skill</th>
                <th className="px-6 py-3 font-medium text-right">Employer Demand</th>
                <th className="px-6 py-3 font-medium text-right">Curriculum Coverage</th>
                <th className="px-6 py-3 font-medium text-center">Gap Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {data.skillGaps.map((gap: any, i: number) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-neutral-900">{gap.skill}</td>
                  <td className="px-6 py-3 text-right text-neutral-900 font-medium">{gap.demand}%</td>
                  <td className="px-6 py-3 text-right text-neutral-600">{gap.curriculum}%</td>
                  <td className="px-6 py-3 text-center">
                    {gap.gap === 'HIGH' && (
                      <span className="inline-flex items-center text-xs font-medium text-red-600 border border-red-200 bg-red-50 px-2 py-0.5 rounded">
                        <ShieldAlert size={12} className="mr-1" /> HIGH
                      </span>
                    )}
                    {gap.gap === 'MEDIUM' && (
                      <span className="inline-flex items-center text-xs font-medium text-saffron-500 border border-amber-200 bg-amber-50 px-2 py-0.5 rounded">
                        MEDIUM
                      </span>
                    )}
                    {gap.gap === 'LOW' && (
                      <span className="inline-flex items-center text-xs font-medium text-neutral-500 border border-neutral-200 bg-neutral-50 px-2 py-0.5 rounded">
                        LOW
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface KpiCardProps {
  label: string;
  value: string | number;
}

function KpiCard({ label, value }: KpiCardProps) {
  return (
    <div className="card p-4 flex flex-col justify-center">
      <span className="text-sm text-neutral-600 font-medium truncate mb-1">{label}</span>
      <span className="text-2xl font-bold text-neutral-900">{value}</span>
    </div>
  );
}
