import { useState, useEffect } from "react";
import { Upload, Download, Wifi, CheckCircle2, Shield } from "lucide-react";

export const DataTransmission = () => {
  const [transmissions, setTransmissions] = useState([
    { id: 1, name: "Vital Signs", progress: 45, status: "uploading", size: "2.3 MB" },
    { id: 2, name: "Patient Records", progress: 100, status: "complete", size: "1.8 MB" },
    { id: 3, name: "Diagnostic Images", progress: 23, status: "uploading", size: "5.1 MB" }
  ]);

  const [networkStatus, setNetworkStatus] = useState({
    signal: 85,
    speed: "4G+",
    latency: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTransmissions(prev => prev.map(transmission => {
        if (transmission.status === "uploading") {
          const newProgress = Math.min(100, transmission.progress + Math.random() * 15);
          return {
            ...transmission,
            progress: newProgress,
            status: newProgress >= 100 ? "complete" : "uploading"
          };
        }
        return transmission;
      }));

      setNetworkStatus(prev => ({
        ...prev,
        signal: Math.max(60, Math.min(100, prev.signal + (Math.random() - 0.5) * 10)),
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() - 0.5) * 5))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTransmissionIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'uploading':
        return <Upload className="w-4 h-4 text-primary animate-pulse" />;
      case 'downloading':
        return <Download className="w-4 h-4 text-accent animate-pulse" />;
      default:
        return <Upload className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-success border-success/30 bg-success/10';
      case 'uploading': return 'text-primary border-primary/30 bg-primary/10';
      case 'downloading': return 'text-accent border-accent/30 bg-accent/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-primary animate-glow-pulse" />
          <h3 className="text-sm font-medium text-card-foreground">Data Transmission</h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${networkStatus.signal > 70 ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
          <span className="text-success font-medium">{networkStatus.speed}</span>
        </div>
      </div>
      
      <div className="space-y-2 h-[calc(100%-3rem)]">
        {/* Network Status */}
        <div className="p-2 bg-muted/10 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Signal Strength</span>
            <span className="text-xs font-medium">{Math.round(networkStatus.signal)}%</span>
          </div>
          <div className="progress-medical h-1.5">
            <div 
              className="progress-fill h-full"
              style={{ width: `${networkStatus.signal}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Latency: {Math.round(networkStatus.latency)}ms</span>
            <span>Encrypted</span>
          </div>
        </div>

        {/* Data Transmissions */}
        {transmissions.map((transmission) => (
          <div key={transmission.id} className={`p-3 rounded-lg border transition-all ${getStatusColor(transmission.status)}`}>
            <div className="flex items-center gap-2 mb-2">
              {getTransmissionIcon(transmission.status)}
              <span className="text-xs font-medium flex-1 truncate">{transmission.name}</span>
              <span className="text-xs text-muted-foreground">{transmission.size}</span>
            </div>
            
            <div className="progress-medical h-1.5 mb-2">
              <div 
                className="progress-fill h-full"
                style={{ 
                  width: `${transmission.progress}%`,
                  animationDelay: `${transmission.id * 0.1}s`
                }}
              />
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="capitalize">{transmission.status}</span>
              <span>{Math.round(transmission.progress)}%</span>
            </div>
            
            {/* Completion Animation */}
            {transmission.status === 'complete' && (
              <div className="flex items-center gap-2 mt-2 p-1 bg-success/10 rounded">
                <CheckCircle2 className="w-3 h-3 text-success" />
                <span className="text-xs text-success">Transmission Complete</span>
                <Shield className="w-3 h-3 text-success ml-auto" />
              </div>
            )}
            
            {/* Data flow particles */}
            {transmission.status === 'uploading' && (
              <div className="relative overflow-hidden mt-1">
                <div className="data-particle"></div>
                <div className="data-particle" style={{ animationDelay: '0.5s' }}></div>
                <div className="data-particle" style={{ animationDelay: '1s' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};