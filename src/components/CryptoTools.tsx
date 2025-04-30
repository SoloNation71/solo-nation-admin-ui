
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { ethers } from 'ethers';

const CryptoTools = () => {
  const [hashInput, setHashInput] = useState('');
  const [hashAlgorithm, setHashAlgorithm] = useState('sha256');
  const [hashOutput, setHashOutput] = useState('');
  const [epochOutput, setEpochOutput] = useState('');
  const [epochInput, setEpochInput] = useState('');
  const [dateOutput, setDateOutput] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionParams, setFunctionParams] = useState('');
  
  // Generate hash based on input and selected algorithm
  const generateHash = async () => {
    if (!hashInput) {
      toast({
        title: "Input required",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let hash = '';
      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);
      
      if (hashAlgorithm === 'sha256') {
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        hash = Array.from(new Uint8Array(hashBuffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      } 
      else if (hashAlgorithm === 'sha512') {
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        hash = Array.from(new Uint8Array(hashBuffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      }
      else if (hashAlgorithm === 'keccak256') {
        try {
          hash = ethers.keccak256(ethers.toUtf8Bytes(hashInput));
        } catch (error) {
          console.error('Ethers keccak256 error:', error);
          hash = 'Error calculating keccak256 hash';
        }
      }
      
      setHashOutput(hash);
    } catch (error) {
      console.error('Hash generation error:', error);
      setHashOutput('Error generating hash');
    }
  };
  
  // Generate current Unix epoch timestamp
  const generateCurrentEpoch = () => {
    const now = Math.floor(Date.now() / 1000);
    setEpochOutput(now.toString());
  };
  
  // Refresh the current epoch time
  const refreshEpoch = () => {
    generateCurrentEpoch();
  };
  
  // Convert epoch timestamp to human-readable date
  const convertEpochToDate = () => {
    if (!epochInput) {
      toast({
        title: "Input required",
        description: "Please enter an epoch timestamp",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const epochTime = parseInt(epochInput, 10);
      const date = new Date(epochTime * 1000);
      setDateOutput(date.toLocaleString());
    } catch (error) {
      setDateOutput('Invalid epoch timestamp');
    }
  };
  
  // Execute smart contract function
  const executeFunction = () => {
    if (!contractAddress || !contractABI || !selectedFunction) {
      toast({
        title: "Missing information",
        description: "Please enter contract address, ABI, and select a function",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Smart Contract Interaction",
      description: "This would connect to a blockchain network to execute the function",
    });
  };

  // Initialize component
  useState(() => {
    generateCurrentEpoch();
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hash Generator Tool */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Hash Generator</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="hashInput">Input Text</Label>
                <Input 
                  id="hashInput"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="Enter text to hash"
                />
              </div>
              
              <div>
                <Label htmlFor="hashAlgorithm">Algorithm</Label>
                <Select value={hashAlgorithm} onValueChange={setHashAlgorithm}>
                  <SelectTrigger id="hashAlgorithm">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sha256">SHA-256</SelectItem>
                    <SelectItem value="sha512">SHA-512</SelectItem>
                    <SelectItem value="keccak256">Keccak-256 (Ethereum)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={generateHash}>Generate Hash</Button>
              
              {hashOutput && (
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm break-all">
                  {hashOutput}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Unix Epoch Time Tool */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Unix Epoch Time</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={generateCurrentEpoch}>Get Current Epoch</Button>
                <Button variant="outline" onClick={refreshEpoch}>Refresh</Button>
              </div>
              
              {epochOutput && (
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                  {epochOutput}
                </div>
              )}
              
              <div>
                <Label htmlFor="epochInput">Convert Epoch to Date</Label>
                <div className="flex gap-2">
                  <Input
                    id="epochInput"
                    type="number"
                    value={epochInput}
                    onChange={(e) => setEpochInput(e.target.value)}
                    placeholder="Enter epoch timestamp"
                  />
                  <Button onClick={convertEpochToDate}>Convert</Button>
                </div>
              </div>
              
              {dateOutput && (
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                  {dateOutput}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Smart Contract Interaction */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Smart Contract Interaction</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contractAddress">Contract Address</Label>
              <Input
                id="contractAddress"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="Enter contract address"
              />
            </div>
            
            <div>
              <Label htmlFor="contractABI">Contract ABI</Label>
              <Textarea
                id="contractABI"
                value={contractABI}
                onChange={(e) => setContractABI(e.target.value)}
                placeholder="Paste contract ABI here"
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="contractFunction">Function</Label>
              <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                <SelectTrigger id="contractFunction">
                  <SelectValue placeholder="Select function..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addCitizen">addCitizen(address, string)</SelectItem>
                  <SelectItem value="revokeCitizenship">revokeCitizenship(address)</SelectItem>
                  <SelectItem value="checkCitizenStatus">checkCitizenStatus(address)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="functionParams">Parameters</Label>
              <Input
                id="functionParams"
                value={functionParams}
                onChange={(e) => setFunctionParams(e.target.value)}
                placeholder="Enter function parameters"
              />
            </div>
            
            <Button onClick={executeFunction}>Execute Function</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTools;
