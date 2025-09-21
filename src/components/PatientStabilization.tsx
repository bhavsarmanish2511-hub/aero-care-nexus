import { useState, useEffect } from "react";
import { Shield, Droplet, Syringe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PatientStabilization = () => {
  const [treatments, setTreatments] = useState([
    { id: 1, name: "IV Fluids", status: "active", progress: 75, icon: Droplet },
    { id: 2, name: "Oxygen", status: "complete", progress: 100, icon: Shield },
    { id: 3, name: "Pain Relief", status: "pending", progress: 0, icon: Syringe },
    { id: 4, name: "Monitoring", status: "active", progress: 90, icon: CheckCircle2 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTreatments(prev => prev.map(treatment => {
        if (treatment.status === "active" && treatment.progress < 100) {
          const newProgress = Math.min(100, treatment.progress + Math.random() * 5);
          return {
            ...treatment,
            progress: newProgress,
            status: newProgress >= 100 ? "complete" : "active"
          };
        }
        return treatment;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-success border-success/30 bg-success/10';
      case 'active': return 'text-primary border-primary/30 bg-primary/10';
      case 'pending': return 'text-muted-foreground border-border bg-muted/20';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary animate-glow-pulse" />
        <h3 className="text-sm font-medium text-card-foreground">Patient Stabilization</h3>
      </div>
      
      <div className="space-y-3 h-[calc(100%-3rem)] overflow-y-auto">
        {treatments.map((treatment) => {
          const IconComponent = treatment.icon;
          return (
            <div key={treatment.id} className={`p-3 rounded-lg border transition-all ${getStatusColor(treatment.status)}`}>
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="w-4 h-4" />
                <span className="text-xs font-medium">{treatment.name}</span>
                {treatment.status === 'complete' && (
                  <CheckCircle2 className="w-3 h-3 text-success ml-auto" />
                )}
              </div>
              
              <div className="progress-medical h-1.5 mb-2">
                <div 
                  className="progress-fill h-full"
                  style={{ 
                    width: `${treatment.progress}%`,
                    animationDelay: `${treatment.id * 0.2}s`
                  }}
                />
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="capitalize">{treatment.status}</span>
                <span>{Math.round(treatment.progress)}%</span>
              </div>
            </div>
          );
        })}
        
        <Button 
          size="sm" 
          className="w-full mt-4 bg-accent/20 hover:bg-accent/30 text-accent border-accent/30"
          variant="outline"
        >
          <Syringe className="w-3 h-3 mr-2" />
          Add Treatment
        </Button>
      </div>
    </div>
  );
};