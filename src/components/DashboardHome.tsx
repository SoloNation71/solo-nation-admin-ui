
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DashboardHome = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="TOTAL CITIZENS" 
          value="0002" 
          change="No change from last month"
        />
        <StatCard 
          title="PENDING APPROVALS" 
          value="02" 
          change="-4% from last week"
        />
        <StatCard 
          title="ACTIVE TRANSACTIONS" 
          value="002" 
          change="+32% from last month" 
          positive
        />
        <StatCard 
          title="NETWORK STATUS" 
          value="Operational" 
          change="99.8% uptime"
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Solo ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Wallet Address</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3">SN-2025-00001</td>
                  <td className="px-4 py-3">John J. Doe</td>
                  <td className="px-4 py-3 font-mono text-sm">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">SN-2025-00002</td>
                  <td className="px-4 py-3">Maria D. Garcia</td>
                  <td className="px-4 py-3 font-mono text-sm">0x2546BcD3c84621e976D8185a91A922aE77ECEc30</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600">Approve</Button>
                    <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600">Reject</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">SN-2025-00003</td>
                  <td className="px-4 py-3">James U. Wilson</td>
                  <td className="px-4 py-3 font-mono text-sm">0xbDA5747bFD65F08deb54cb465eB87D40e51B197E</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600">Approve</Button>
                    <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600">Reject</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">SN-2025-00004</td>
                  <td className="px-4 py-3">Sarah Ahmed</td>
                  <td className="px-4 py-3 font-mono text-sm">0xdD870fA1b7C4700F2BD7f44238821C26f7392148</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const StatCard = ({ title, value, change, positive = false }) => (
  <Card>
    <CardContent className="p-6">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      <div className={`text-xs mt-1 ${positive ? 'text-green-500' : 'text-gray-500'}`}>
        {change}
      </div>
    </CardContent>
  </Card>
);

export default DashboardHome;
