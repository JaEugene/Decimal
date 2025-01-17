import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PerformanceHub } from './pages/PerformanceHub';
import { ComplianceHub } from './pages/ComplianceHub';
import { Marketplace } from './pages/Marketplace';
import { AthleteProfile } from './pages/AthleteProfile';
import { Playbook } from './pages/Playbook';
import { Mission } from './pages/Mission';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingScreen } from './components/LoadingScreen';
import { testConnection } from './lib/test-connection';

export default function App() {
  useEffect(() => {
    // Test Supabase connection on app load
    testConnection().then(connected => {
      if (connected) {
        console.log('✅ Connected to Supabase successfully');
      } else {
        console.error('❌ Failed to connect to Supabase');
      }
    });
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#4169E1]/5 to-white">
        <Router>
          <LoadingScreen />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/performance" element={<Layout><PerformanceHub /></Layout>} />
            <Route path="/compliance" element={<Layout><ComplianceHub /></Layout>} />
            <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
            <Route path="/athlete/:id" element={<Layout><AthleteProfile /></Layout>} />
            <Route path="/playbook" element={<Layout><Playbook /></Layout>} />
            <Route path="/mission" element={<Layout><Mission /></Layout>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}