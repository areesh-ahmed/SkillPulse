import React, { useState } from 'react';
import { User, MapPin, Award, Briefcase, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function TraineeProfile() {
  const [activeTab, setActiveTab] = useState('journey');

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">SkillPulse Profile</h1>
          <p className="text-sm text-neutral-500 mt-1">Unified longitudinal record.</p>
        </div>
        <div className="flex items-center px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded text-sm text-neutral-700 font-medium">
          <span className="text-neutral-500 mr-2 uppercase text-xs tracking-wider">ID</span>
          SP-MH-8F72A91
        </div>
      </div>

      {/* Profile Header */}
      <div className="card p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="h-20 w-20 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 flex-shrink-0">
          <User size={40} />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-neutral-900">Rahul Sharma</h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-neutral-600">
            <span className="flex items-center"><MapPin size={16} className="mr-1 text-neutral-400" /> Nashik, Maharashtra</span>
            <span className="flex items-center"><Award size={16} className="mr-1 text-neutral-400" /> Data Analytics Certified</span>
            <span className="flex items-center text-green-700 font-medium"><Briefcase size={16} className="mr-1 text-green-600" /> Employed</span>
          </div>
        </div>
        <div className="bg-primary-50 border border-primary-100 p-4 rounded-md w-full md:w-64">
          <div className="text-xs text-primary-600 font-semibold uppercase tracking-wider mb-1">Outcome Confidence</div>
          <div className="flex items-end mb-2">
            <span className="text-2xl font-bold text-primary-900 leading-none">91%</span>
          </div>
          <div className="w-full bg-primary-200 rounded-full h-1.5 mb-2">
            <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: '91%' }}></div>
          </div>
          <p className="text-xs text-primary-700">Employer verified • 6M Retained</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8">
          {['journey', 'history', 'verification'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Journey Content */}
      {activeTab === 'journey' && (
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Longitudinal Journey</h3>
          
          <div className="relative border-l border-neutral-200 ml-3 space-y-8">
            <JourneyStep 
              icon={<User size={16} />}
              title="Enrolled in Data Analytics"
              date="12 Jan 2026"
              description="Provider: TechMahindra SMART Academy, Nashik"
              status="completed"
            />
            <JourneyStep 
              icon={<Award size={16} />}
              title="Certified"
              date="15 Apr 2026"
              description="Grade: A (88%). Skills: SQL, Python Basics, Excel."
              status="completed"
            />
            <JourneyStep 
              icon={<Briefcase size={16} />}
              title="Placed (Initial Employment)"
              date="12 Jul 2026"
              description="Role: Junior Data Analyst at Wipro, Pune. Starting Salary: ₹24,000"
              status="completed"
            />
            <JourneyStep 
              icon={<CheckCircle size={16} />}
              title="Employer Verification"
              date="14 Aug 2026"
              description="Wipro HR verified employment status and role relevance."
              status="completed"
            />
            <JourneyStep 
              icon={<Clock size={16} />}
              title="6M Retention Follow-up"
              date="12 Jan 2027"
              description="Retained. Salary increased to ₹27,500. Trainee reported high satisfaction."
              status="completed"
              isLast={true}
            />
          </div>
        </div>
      )}
      
      {activeTab === 'verification' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Verification Signals</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded">
              <span className="text-sm font-medium text-neutral-700">Trainee reported employment</span>
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded">
              <span className="text-sm font-medium text-neutral-700">Employer confirmed</span>
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded">
              <span className="text-sm font-medium text-neutral-700">Employment duration &gt; 6M</span>
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded">
              <span className="text-sm font-medium text-neutral-700">Job role matches training</span>
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded">
              <span className="text-sm font-medium text-neutral-700">Salary documented</span>
              <CheckCircle size={18} className="text-green-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface JourneyStepProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: string;
  status: string;
  isLast?: boolean;
}

function JourneyStep({ icon, title, date, description, status, isLast }: JourneyStepProps) {
  return (
    <div className="relative pl-6">
      <span className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-2 flex items-center justify-center bg-white
        ${status === 'completed' ? 'border-primary-500 text-primary-600' : 'border-neutral-300 text-neutral-400'}
      `}>
        {icon}
      </span>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
        <h4 className="text-base font-semibold text-neutral-900">{title}</h4>
        <span className="text-sm text-neutral-500">{date}</span>
      </div>
      <p className="text-sm text-neutral-600">{description}</p>
      {!isLast && <div className="h-6"></div>}
    </div>
  );
}
