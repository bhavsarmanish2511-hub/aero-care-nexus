import { useState, useEffect } from "react";
import { Scan, Eye, Fingerprint, Shield } from "lucide-react";

export const BiometricScan = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'complete' | 'verified'>('scanning');
  const [scanType, setScanType] = useState<'facial' | 'fingerprint' | 'retinal'>('facial');

  useEffect(() => {
    if (scanProgress < 100) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            setScanStatus('complete');
            setTimeout(() => setScanStatus('verified'), 500);
            return 100;
          }
          return newProgress;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [scanProgress]);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      setScanType(prev => {
        const types: ('facial' | 'fingerprint' | 'retinal')[] = ['facial', 'fingerprint', 'retinal'];
        const currentIndex = types.indexOf(prev);
        return types[(currentIndex + 1) % types.length];
      });
    }, 3000);

    return () => clearInterval(typeInterval);
  }, []);

  const getScanIcon = () => {
    switch (scanType) {
      case 'facial':
        return <Scan className="w-5 h-5 text-primary" />;
      case 'fingerprint':
        return <Fingerprint className="w-5 h-5 text-primary" />;
      case 'retinal':
        return <Eye className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center gap-2 mb-3">
        {getScanIcon()}
        <h3 className="text-sm font-medium text-card-foreground">Biometric Scan</h3>
      </div>
      
      <div className="space-y-3">
        <div className="scan-grid h-16 rounded-lg flex items-center justify-center relative">
          <div className="text-xs text-center">
            <div className="text-primary font-medium capitalize">{scanType} Recognition</div>
            <div className="text-muted-foreground mt-1">
              {scanStatus === 'scanning' ? 'Scanning...' : 
               scanStatus === 'complete' ? 'Processing...' : 'Verified'}
            </div>
          </div>
          
          {/* Scan line animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-0.5 bg-primary/60 absolute top-1/2 animate-scan-line"></div>
          </div>
        </div>
        
        <div className="progress-medical h-2">
          <div 
            className="progress-fill h-full"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
        
        <div className="text-xs text-center text-muted-foreground">
          {Math.round(scanProgress)}% Complete
        </div>
        
        {scanStatus === 'verified' && (
          <div className="flex items-center justify-center gap-2 p-2 bg-success/10 border border-success/20 rounded-lg">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs text-success font-medium">Identity Verified</span>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Match:</span>
            <span className="text-success">99.7%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Security:</span>
            <span className="text-primary">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};