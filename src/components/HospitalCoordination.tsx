import { useState, useEffect } from "react";
import { Building2, Users, Phone, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HospitalCoordination = () => {
  const [connections, setConnections] = useState([
    { id: 1, name: "St. Mary's ER", status: "connected", distance: "3.2 km", eta: "8 min", beds: 4 },
    { id: 2, name: "City General", status: "connected", distance: "5.1 km", eta: "12 min", beds: 2 },
    { id: 3, name: "Regional Medical", status: "connecting", distance: "7.8 km", eta: "15 min", beds: 8 }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Trauma bay prepared at St. Mary's", time: "2 min ago", type: "success" },
    { id: 2, message: "Blood type O- reserved", time: "4 min ago", type: "info" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => {
        if (conn.status === "connecting" && Math.random() > 0.7) {
          return { ...conn, status: "connected" };
        }
        return conn;
      }));

      // Add random notifications
      if (Math.random() > 0.8) {
        const messages = [
          "Surgeon on standby",
          "OR 3 being prepared",
          "X-ray tech notified",
          "Blood bank contacted"
        ];
        
        setNotifications(prev => [{
          id: Date.now(),
          message: messages[Math.floor(Math.random() * messages.length)],
          time: "now",
          type: "info"
        }, ...prev.slice(0, 2)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-success border-success/30 bg-success/10';
      case 'connecting': return 'text-warning border-warning/30 bg-warning/10 animate-pulse';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success bg-success/10 border-success/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-5 h-5 text-primary animate-glow-pulse" />
        <h3 className="text-sm font-medium text-card-foreground">Hospital Coordination</h3>
      </div>
      
      <div className="space-y-2 h-[calc(100%-3rem)]">
        {/* Hospital Connections */}
        <div className="space-y-2">
          {connections.map((hospital) => (
            <div key={hospital.id} className={`p-2 rounded-lg border transition-all ${getStatusColor(hospital.status)}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${hospital.status === 'connected' ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
                  <span className="text-xs font-medium truncate">{hospital.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                    <Phone className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{hospital.eta}</span>
                </div>
                <div>{hospital.distance}</div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{hospital.beds} beds</span>
                </div>
              </div>
              
              {/* Connection mesh effect */}
              {hospital.status === 'connected' && (
                <div className="mt-1 h-1 bg-gradient-to-r from-transparent via-success to-transparent opacity-60 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            <Phone className="w-3 h-3 mr-1" />
            Call ER
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            Send Update
          </Button>
        </div>
        
        {/* Recent Notifications */}
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-muted-foreground">Recent Updates</h4>
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-2 rounded border text-xs transition-all ${getNotificationColor(notification.type)}`}>
              <div className="flex items-start justify-between gap-2">
                <span className="flex-1">{notification.message}</span>
                <span className="text-muted-foreground text-xs whitespace-nowrap">{notification.time}</span>
              </div>
              
              {/* Notification pulse effect */}
              {notification.time === "now" && (
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};