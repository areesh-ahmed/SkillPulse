import { overviewData, districtDetails } from '../data/mockData';

// Toggleable delay for mock APIs
const DELAY_MS = parseInt(import.meta.env.VITE_MOCK_API_DELAY || '0', 10);

const withDelay = <T>(data: T): Promise<{ data: T }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, DELAY_MS);
  });
};

export const apiService = {
  getOverview: async () => {
    return withDelay(overviewData);
  },
  
  getDistrictDetails: async (districtName) => {
    return withDelay(districtDetails[districtName] || null);
  },

  askCopilot: async (question) => {
    // Basic mock logic for SIH demo
    let response = "I don't have enough data to answer that specific question yet.";
    
    if (question.toLowerCase().includes("nashik")) {
      response = `Nashik's employment rate is 61%, compared with Pune's 74%.\n\nThree factors appear significant:\n1. Higher concentration of courses with lower local employer demand.\n2. SQL and Power BI gaps in Data Analytics training.\n3. Higher attrition associated with salary mismatch.\n\nRecommended actions:\n- strengthen employer partnerships\n- introduce targeted modules\n- expand apprenticeship opportunities`;
    }
    
    return withDelay({ answer: response });
  }
};
