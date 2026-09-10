import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Briefcase, User, Calendar, IndianRupee } from 'lucide-react';

export default function Verification() {
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Employer Verification Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Pending outcomes requiring employer confirmation.</p>
      </div>

      <div className="card max-w-3xl">
        <div className="border-b border-neutral-200 px-6 py-4 bg-neutral-50/50 rounded-t-lg flex justify-between items-center">
          <h2 className="text-base font-semibold text-neutral-900">Pending Verification</h2>
          <span className="inline-flex items-center text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
            Action Required
          </span>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center">
                <User className="text-neutral-400 mr-3" size={18} />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Employee</div>
                  <div className="font-medium text-neutral-900">Rahul Sharma</div>
                </div>
              </div>
              <div className="flex items-center">
                <Briefcase className="text-neutral-400 mr-3" size={18} />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Reported Role</div>
                  <div className="font-medium text-neutral-900">Junior Data Analyst</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="text-neutral-400 mr-3" size={18} />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Joining Date</div>
                  <div className="font-medium text-neutral-900">12 July 2026</div>
                </div>
              </div>
              <div className="flex items-center">
                <IndianRupee className="text-neutral-400 mr-3" size={18} />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Reported Salary</div>
                  <div className="font-medium text-neutral-900">₹24,000 / month</div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-64 bg-neutral-50 border border-neutral-200 rounded p-4 self-start">
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">Training Context</h3>
              <p className="text-sm text-neutral-600 mb-1"><span className="font-medium">Course:</span> Data Analytics</p>
              <p className="text-sm text-neutral-600 mb-3"><span className="font-medium">Provider:</span> TechMahindra SMART</p>
              
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <label className="block text-sm font-medium text-neutral-900 mb-1">Training Relevance</label>
                <select className="w-full border border-neutral-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                  <option>Not Relevant</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row gap-3">
            {!verified ? (
              <>
                <button 
                  onClick={handleVerify}
                  className="flex-1 bg-primary-600 text-white font-medium py-2.5 px-4 rounded shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex justify-center items-center"
                >
                  <CheckCircle size={18} className="mr-2" /> Verify Employment
                </button>
                <button className="flex-1 bg-white text-neutral-700 border border-neutral-300 font-medium py-2.5 px-4 rounded shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex justify-center items-center">
                  <AlertCircle size={18} className="mr-2 text-neutral-400" /> Report Discrepancy
                </button>
              </>
            ) : (
              <div className="w-full bg-green-50 border border-green-200 text-green-800 p-4 rounded flex items-start">
                <CheckCircle className="text-green-600 mr-3 mt-0.5" size={20} />
                <div>
                  <h4 className="font-medium">Employment Verified Successfully</h4>
                  <p className="text-sm mt-1 text-green-700">Thank you. This outcome has been recorded in the longitudinal database.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
