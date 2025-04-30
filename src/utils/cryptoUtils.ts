
import { ethers } from 'ethers';

// Generate a unique Solo Nation ID in the format SN-YYYY-NNNNN
export function generateSoloNationId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 digit number
  return `SN-${year}-${randomNum.toString().padStart(5, '0')}`;
}

// Generate current Unix epoch timestamp
export function getCurrentEpoch(): number {
  return Math.floor(Date.now() / 1000);
}

// Convert epoch timestamp to readable date
export function epochToDate(epoch: number): string {
  return new Date(epoch * 1000).toLocaleString();
}

// Generate hash using Web Crypto API
export async function generateHash(text: string, algorithm: string): Promise<string> {
  try {
    if (algorithm === 'keccak256') {
      return ethers.keccak256(ethers.toUtf8Bytes(text));
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    let hashAlgorithm;
    switch(algorithm) {
      case 'sha256': hashAlgorithm = 'SHA-256'; break;
      case 'sha512': hashAlgorithm = 'SHA-512'; break;
      default: hashAlgorithm = 'SHA-256';
    }
    
    const hashBuffer = await crypto.subtle.digest(hashAlgorithm, data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('Hash generation error:', error);
    return 'Error generating hash';
  }
}

// Wallet connection functions could be added here in a real implementation
