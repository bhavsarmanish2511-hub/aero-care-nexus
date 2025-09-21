import { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle2, Info, Zap } from "lucide-react";

export const TimelineEvents = () => {
  const [events, setEvents] = useState([
    { id: 1, time: "14:32", event: "Emergency call received", type: "info", icon: Info },
    { id: 2, time: "14:33", event: "Ambulance dispatched", type: "success", icon: CheckCircle2 },
    { id: 3, time: "14:35", event: "Patient condition: Critical", type: "warning", icon: AlertTriangle },
    { id: 4, time: "14:42", event: "On scene arrival", type: "success", icon: CheckCircle2 },
    { id: 5, time: "14:43", event: "Initial assessment complete", type: "info", icon: Info },
    { id: 6, time: "14:45", event: "IV access established", type: "success", icon: CheckCircle2 },
    { id: 7, time: "14:46", event: "Vitals stabilizing", type: "success", icon: CheckCircle2 },
    { id: 8, time: "14:47", event: "Preparing for transport", type: "info", icon: Zap }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  useEffect(() => {
    // Add new events periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newEvents = [
          { event: "Medication administered", type: "success", icon: CheckCircle2 },
          { event: "Vital signs updated", type: "info", icon: Info },
          { event: "Hospital notified", type: "info", icon: Info },
          { event: "Patient responsive", type: "success", icon: CheckCircle2 }
        ];
        
        const randomEvent = newEvents[Math.floor(Math.random() * newEvents.length)];
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setEvents(prev => [...prev, {
          id: Date.now(),
          time: timeString,
          event: randomEvent.event,
          type: randomEvent.type,
          icon: randomEvent.icon
        }]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success border-success/30 bg-success/10';
      case 'warning': return 'text-warning border-warning/30 bg-warning/10';
      case 'info': return 'text-primary border-primary/30 bg-primary/10';
      case 'critical': return 'text-destructive border-destructive/30 bg-destructive/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getEventDetails = (event: typeof events[0]) => {
    const details = {
      "Emergency call received": "Location: Downtown Medical District. Nature: Multi-vehicle accident with pedestrian involvement.",
      "Ambulance dispatched": "Unit: Rescue 7. Crew: 2 paramedics, 1 EMT. Response time: Priority 1.",
      "Patient condition: Critical": "Male, 42 years. Conscious but disoriented. Multiple trauma suspected.",
      "On scene arrival": "Scene secured. Patient assessment initiated. Fire department on scene.",
      "Initial assessment complete": "Airway clear, breathing assisted, circulation stable. Glasgow Coma Scale: 12.",
      "IV access established": "18G IV in left antecubital. Normal saline initiated at 125ml/hr.",
      "Vitals stabilizing": "HR: 72, BP: 118/78, SpO2: 98%, Temp: 98.6°F. Trending stable.",
      "Preparing for transport": "Patient secured on gurney. Destination: St. Mary's Emergency Department."
    };
    return details[event.event as keyof typeof details] || "Additional details available in patient record.";
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-primary animate-pulse-vital" />
        <h3 className="text-sm font-medium text-card-foreground">Timeline of Events</h3>
      </div>
      
      <div className="h-[calc(100%-3rem)] overflow-x-auto">
        <div className="flex gap-3 pb-2 min-w-max">
          {events.map((event) => {
            const IconComponent = event.icon;
            return (
              <div 
                key={event.id} 
                className={`timeline-event flex-shrink-0 w-48 p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getEventColor(event.type)} ${selectedEvent === event.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs font-mono font-medium">{event.time}</span>
                </div>
                
                <div className="text-xs font-medium mb-1 line-clamp-2">
                  {event.event}
                </div>
                
                <div className={`text-xs capitalize ${event.type === 'success' ? 'text-success' : event.type === 'warning' ? 'text-warning' : event.type === 'critical' ? 'text-destructive' : 'text-primary'}`}>
                  {event.type}
                </div>
                
                {/* Glow effect for recent events */}
                {events.indexOf(event) >= events.length - 2 && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg -z-10 animate-glow-pulse"></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Event Details Popup */}
        {selectedEvent && (
          <div className="mt-3 p-3 bg-popover border border-border rounded-lg">
            <div className="text-xs text-popover-foreground">
              {getEventDetails(events.find(e => e.id === selectedEvent)!)}
            </div>
            <button 
              className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
              onClick={() => setSelectedEvent(null)}
            >
              Close Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};