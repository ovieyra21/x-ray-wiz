import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  nextAppointment?: string;
  status: "active" | "pending" | "completed";
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Ana García",
    age: 34,
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-22",
    status: "active"
  },
  {
    id: "2", 
    name: "Carlos Rodríguez",
    age: 28,
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-25",
    status: "pending"
  },
  {
    id: "3",
    name: "María López",
    age: 45,
    lastVisit: "2024-01-13",
    status: "completed"
  },
  {
    id: "4",
    name: "José Martínez",
    age: 52,
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-24",
    status: "active"
  }
];

export function RecentPatients() {
  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "Activo";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completado";
      default:
        return "Sin estado";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Pacientes Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPatients.map((patient) => (
            <div key={patient.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/20 text-primary font-medium">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {patient.name}
                  </p>
                  <Badge variant="secondary" className={getStatusColor(patient.status)}>
                    {getStatusText(patient.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Última: {patient.lastVisit}</span>
                  </div>
                  
                  {patient.nextAppointment && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Próxima: {patient.nextAppointment}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{patient.age} años</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}