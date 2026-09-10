import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/government/Dashboard';
import AICopilot from './pages/government/AICopilot';
import TraineeProfile from './pages/trainee/TraineeProfile';
import Verification from './pages/employer/Verification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="districts" element={<div className="p-4">Districts Content</div>} />
          <Route path="courses" element={<div className="p-4">Courses Content</div>} />
          <Route path="providers" element={<div className="p-4">Providers Content</div>} />
          <Route path="employment" element={<div className="p-4">Employment Content</div>} />
          <Route path="retention" element={<div className="p-4">Retention Content</div>} />
          <Route path="skill-gaps" element={<div className="p-4">Skill Gaps Content</div>} />
          <Route path="copilot" element={<AICopilot />} />
          <Route path="profile" element={<TraineeProfile />} />
          <Route path="employer/verification" element={<Verification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
