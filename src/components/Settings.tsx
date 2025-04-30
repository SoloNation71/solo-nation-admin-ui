
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [adminWallet, setAdminWallet] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [networkURL, setNetworkURL] = useState('https://mainnet.infura.io/v3/YOUR_API_KEY');
  const [gasPrice, setGasPrice] = useState('50');
  const [approvalThreshold, setApprovalThreshold] = useState('2');
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated",
    });
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">System Settings</h2>
        
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="adminWallet">Admin Wallet Address</Label>
              <Input
                id="adminWallet"
                value={adminWallet}
                onChange={(e) => setAdminWallet(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="networkURL">Ethereum Network URL</Label>
              <Input
                id="networkURL"
                value={networkURL}
                onChange={(e) => setNetworkURL(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="gasPrice">Default Gas Price (Gwei)</Label>
              <Input
                id="gasPrice"
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="approvalThreshold">Approval Threshold</Label>
              <Select value={approvalThreshold} onValueChange={setApprovalThreshold}>
                <SelectTrigger id="approvalThreshold">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Admin</SelectItem>
                  <SelectItem value="2">Two Admins</SelectItem>
                  <SelectItem value="3">Three Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-4 border-t flex justify-end gap-2">
            <Button type="submit">Save Settings</Button>
            <Button type="reset" variant="outline">Reset</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Settings;
