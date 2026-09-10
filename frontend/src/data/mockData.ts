export const overviewData = {
  kpis: {
    totalTrainees: "1.24M",
    certified: "87.2%",
    employmentRate: "68.4%",
    retention6M: "61.2%",
    medianWage: "₹21,800",
    impactScore: 82
  },
  districtRanking: [
    { id: 1, name: "Pune", trainees: "214k", employment: 74, retention: 68, wage: 25400 },
    { id: 2, name: "Mumbai", trainees: "198k", employment: 71, retention: 65, wage: 26100 },
    { id: 3, name: "Thane", trainees: "156k", employment: 69, retention: 62, wage: 23500 },
    { id: 4, name: "Nashik", trainees: "112k", employment: 61, retention: 52, wage: 18900 },
    { id: 5, name: "Nagpur", trainees: "105k", employment: 65, retention: 58, wage: 20100 },
  ],
  employmentTrend: [
    { month: 'Jan', rate: 64 },
    { month: 'Feb', rate: 65 },
    { month: 'Mar', rate: 64.5 },
    { month: 'Apr', rate: 66 },
    { month: 'May', rate: 67.2 },
    { month: 'Jun', rate: 68.4 },
  ],
  retentionCurve: [
    { period: '1M', rate: 100 },
    { period: '3M', rate: 82 },
    { period: '6M', rate: 61.2 },
    { period: '9M', rate: 54 },
    { period: '12M', rate: 48 },
  ],
  coursePerformance: [
    { id: 1, name: "Data Analytics", enrolled: "42,100", certified: "89%", employment: "76%", retention: "68%", wage: "₹28,500", impact: 85 },
    { id: 2, name: "Industrial Automation", enrolled: "28,400", certified: "92%", employment: "81%", retention: "74%", wage: "₹22,000", impact: 88 },
    { id: 3, name: "Retail Management", enrolled: "65,200", certified: "84%", employment: "58%", retention: "42%", wage: "₹15,500", impact: 62 },
    { id: 4, name: "Healthcare Assistant", enrolled: "34,800", certified: "95%", employment: "88%", retention: "82%", wage: "₹18,000", impact: 91 },
  ],
  skillGaps: [
    { skill: "Power BI", course: "Data Analytics", demand: 87, curriculum: 34, gap: "HIGH" },
    { skill: "SQL", course: "Data Analytics", demand: 92, curriculum: 51, gap: "HIGH" },
    { skill: "Python", course: "Data Analytics", demand: 79, curriculum: 63, gap: "MEDIUM" },
    { skill: "Excel", course: "Data Analytics", demand: 71, curriculum: 89, gap: "LOW" },
  ]
};

export const districtDetails = {
  "Nashik": {
    employment: 61,
    retention6M: 52,
    medianWage: 18900,
    topGap: "Industrial Automation",
    attritionReason: "Low Salary",
    aiRecommendation: "Increase employer-linked industrial automation training and apprenticeship opportunities."
  }
};
