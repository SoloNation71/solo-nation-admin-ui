
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import CitizenManagement from './CitizenManagement';
import CryptoTools from './CryptoTools';
import Settings from './Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleLogout = () => {
    sessionStorage.removeItem('soloNationAuth');
    sessionStorage.removeItem('adminUser');
    window.location.reload();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setActiveTab('tools')}>Crypto Tools</Button>
        </div>
        
        {activeTab === 'dashboard' && <DashboardHome />}
        {activeTab === 'citizens' && <CitizenManagement />}
        {activeTab === 'tools' && <CryptoTools />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;
