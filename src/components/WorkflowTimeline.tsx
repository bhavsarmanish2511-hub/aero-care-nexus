import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react";

export const WorkflowTimeline = () => {
  const [steps, setSteps] = useState([
    { id: 1, name: "Dispatch", status: "complete", time: "14:32", icon: CheckCircle2 },
    { id: 2, name: "En Route", status: "complete", time: "14:35", icon: CheckCircle2 },
    { id: 3, name: "On Scene", status: "complete", time: "14:42", icon: CheckCircle2 },
    { id: 4, name: "Assessment", status: "active", time: "14:45", icon: Clock },
    { id: 5, name: "Treatment", status: "pending", time: "---", icon: Circle },
    { id: 6, name: "Transport", status: "pending", time: "---", icon: Circle },
    { id: 7, name: "Hospital", status: "pending", time: "---", icon: Circle }
  ]);

  const [currentTime, setCurrentTime] = useState("14:47");

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prev => {
        const activeIndex = prev.findIndex(step => step.status === "active");
        if (activeIndex !== -1 && Math.random() > 0.7) {
          const newSteps = [...prev];
          newSteps[activeIndex] = { ...newSteps[activeIndex], status: "complete" };
          if (activeIndex + 1 < newSteps.length) {
            newSteps[activeIndex + 1] = { 
              ...newSteps[activeIndex + 1], 
              status: "active",
              time: currentTime
            };
          }
          return newSteps;
        }
        return prev;
      });
      
      // Update current time
      const [hours, minutes] = currentTime.split(':').map(Number);
      const newMinutes = minutes + 1;
      const newHours = newMinutes >= 60 ? hours + 1 : hours;
      setCurrentTime(`${newHours}:${(newMinutes % 60).toString().padStart(2, '0')}`);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const getStepColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-success border-success/30 bg-success/10';
      case 'active': return 'text-primary border-primary/30 bg-primary/10 animate-glow-pulse';
      case 'pending': return 'text-muted-foreground border-border bg-muted/10';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary animate-pulse-vital" />
        <h3 className="text-sm font-medium text-card-foreground">Workflow</h3>
      </div>
      
      <div className="relative h-[calc(100%-3rem)]">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className={`relative flex items-center gap-3 p-2 rounded-lg transition-all ${getStepColor(step.status)}`}>
                {/* Timeline Node */}
                <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center ${getStepColor(step.status)}`}>
                  <IconComponent className="w-3 h-3" />
                  
                  {/* Pulse effect for active step */}
                  {step.status === 'active' && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate">{step.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{step.time}</span>
                  </div>
                  
                  {step.status === 'active' && (
                    <div className="progress-medical h-1 mt-1">
                      <div 
                        className="progress-fill h-full"
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          animationDuration: '3s'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Current Time Display */}
        <div className="mt-4 p-2 bg-primary/10 border border-primary/20 rounded-lg text-center">
          <div className="text-xs text-muted-foreground">Current Time</div>
          <div className="text-sm font-bold text-primary font-mono">{currentTime}</div>
        </div>
      </div>
    </div>
  );
};