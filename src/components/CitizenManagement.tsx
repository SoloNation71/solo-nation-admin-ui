
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const CitizenManagement = () => {
  const [activeTab, setActiveTab] = useState('all-citizens');
  const [soloId, setSoloId] = useState('SN-2025-00005');
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Citizen Added",
      description: "New citizen has been successfully added to the system",
    });
  };

  const handleApprove = (id: string) => {
    toast({
      title: "Citizen Approved",
      description: `Citizen ${id} has been approved`,
      variant: "default",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Citizen Rejected",
      description: `Citizen ${id} has been rejected`,
      variant: "destructive",
    });
  };

  const handleRevoke = (id: string) => {
    toast({
      title: "Citizenship Revoked",
      description: `Citizen ${id} has had their citizenship revoked`,
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">Citizen Management</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all-citizens">All Citizens</TabsTrigger>
            <TabsTrigger value="pending-citizens">Pending Approval</TabsTrigger>
            <TabsTrigger value="add-citizen">Add New Citizen</TabsTrigger>
          </TabsList>
          
          {/* Filters Section */}
          {(activeTab === 'all-citizens' || activeTab === 'pending-citizens') && (
            <div className="p-4 bg-gray-50 rounded-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="filterStatus">Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="filterStatus">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filterDate">Enrollment Date</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="filterDate">
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filterTier">Citizenship Tier</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="filterTier">
                      <SelectValue placeholder="All Tiers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="founding">Founding Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <Input id="search" placeholder="Search by name, ID, or wallet address" />
                </div>
                <div className="flex items-end gap-2 mt-4 md:mt-0">
                  <Button>Apply Filters</Button>
                  <Button variant="outline">Reset Filters</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* All Citizens Tab */}
          <TabsContent value="all-citizens" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Solo ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Wallet Address</th>
                    <th className="px-4 py-3 text-left">Enrollment Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3">SN-2025-00001</td>
                    <td className="px-4 py-3">Dan Diamond</td>
                    <td className="px-4 py-3 font-mono text-sm">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</td>
                    <td className="px-4 py-3">2025-03-10</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm">View</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleRevoke('SN-2025-00001')}>Revoke</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">SN-2025-00002</td>
                    <td className="px-4 py-3">Maria Garcia</td>
                    <td className="px-4 py-3 font-mono text-sm">0x2546BcD3c84621e976D8185a91A922aE77ECEc30</td>
                    <td className="px-4 py-3">2025-03-15</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600" 
                        onClick={() => handleApprove('SN-2025-00002')}>Approve</Button>
                      <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleReject('SN-2025-00002')}>Reject</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">SN-2025-00003</td>
                    <td className="px-4 py-3">James Wilson</td>
                    <td className="px-4 py-3 font-mono text-sm">0xbDA5747bFD65F08deb54cb465eB87D40e51B197E</td>
                    <td className="px-4 py-3">2025-03-18</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleApprove('SN-2025-00003')}>Approve</Button>
                      <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleReject('SN-2025-00003')}>Reject</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">SN-2025-00004</td>
                    <td className="px-4 py-3">Sarah Ahmed</td>
                    <td className="px-4 py-3 font-mono text-sm">0xdD870fA1b7C4700F2BD7f44238821C26f7392148</td>
                    <td className="px-4 py-3">2025-03-20</td>
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
            
            <div className="mt-6 flex flex-wrap gap-2">
              <Button>Bulk Approve Selected</Button>
              <Button variant="destructive">Bulk Reject Selected</Button>
              <Button variant="outline">Export Citizen Data</Button>
              <Button variant="secondary">Generate Citizenship Report</Button>
            </div>
          </TabsContent>
          
          {/* Pending Citizens Tab */}
          <TabsContent value="pending-citizens" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Solo ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Wallet Address</th>
                    <th className="px-4 py-3 text-left">Application Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3">SN-2025-00002</td>
                    <td className="px-4 py-3">Maria Garcia</td>
                    <td className="px-4 py-3 font-mono text-sm">0x2546BcD3c84621e976D8185a91A922aE77ECEc30</td>
                    <td className="px-4 py-3">2025-03-15</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleApprove('SN-2025-00002')}>Approve</Button>
                      <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleReject('SN-2025-00002')}>Reject</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">SN-2025-00003</td>
                    <td className="px-4 py-3">James Wilson</td>
                    <td className="px-4 py-3 font-mono text-sm">0xbDA5747bFD65F08deb54cb465eB87D40e51B197E</td>
                    <td className="px-4 py-3">2025-03-18</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm" variant="outline" className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleApprove('SN-2025-00003')}>Approve</Button>
                      <Button size="sm" variant="outline" className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleReject('SN-2025-00003')}>Reject</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Add New Citizen Tab */}
          <TabsContent value="add-citizen" className="mt-0">
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="soloId">Solo Nation ID Number</Label>
                  <Input id="soloId" value={soloId} readOnly className="bg-gray-100" />
                  <p className="text-sm text-gray-500 mt-1">Automatically generated unique ID (SN-YYYY-NNNNN format)</p>
                </div>
                
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter citizen's full name" />
                </div>
                
                <div>
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input id="walletAddress" placeholder="Enter Ethereum wallet address" />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                
                <div>
                  <Label htmlFor="citizenshipTier">Citizenship Tier</Label>
                  <Select>
                    <SelectTrigger id="citizenshipTier">
                      <SelectValue placeholder="-Select Tier-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="founding">Founding Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="kyc">KYC Verification</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="kyc">
                      <SelectValue placeholder="Select KYC level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not Verified</SelectItem>
                      <SelectItem value="basic">Basic Verification</SelectItem>
                      <SelectItem value="advanced">Advanced Verification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="idDocument">ID Document</Label>
                  <Input id="idDocument" type="file" />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Admin Notes</Label>
                  <textarea 
                    id="notes" 
                    placeholder="Enter any additional notes or comments" 
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label>Additional Controls</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="autoApprove" />
                      <label htmlFor="autoApprove">Auto-approve if KYC verified</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sendNotification" />
                      <label htmlFor="sendNotification">Send notification email to citizen</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mintToken" />
                      <label htmlFor="mintToken">Mint citizenship NFT token upon approval</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button type="submit">Submit Application</Button>
                <Button type="reset" variant="outline">Reset Form</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CitizenManagement;
