import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Clock,
  FileText,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextAppointment?: string;
  status: "active" | "inactive" | "pending";
  insuranceProvider?: string;
  medicalHistory: string[];
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Ana García Martínez",
    age: 34,
    gender: "F",
    phone: "+34 666 123 456",
    email: "ana.garcia@email.com",
    address: "Calle Mayor 15, Madrid",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-22",
    status: "active",
    insuranceProvider: "Sanitas",
    medicalHistory: ["Hipertensión", "Alergia a penicilina"]
  },
  {
    id: "2",
    name: "Carlos Rodríguez López",
    age: 28,
    gender: "M",
    phone: "+34 677 234 567",
    email: "carlos.rodriguez@email.com",
    address: "Avenida Libertad 42, Barcelona",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-25",
    status: "pending",
    insuranceProvider: "Adeslas",
    medicalHistory: ["Diabetes tipo 2"]
  },
  {
    id: "3",
    name: "María López Fernández",
    age: 45,
    gender: "F",
    phone: "+34 688 345 678",
    email: "maria.lopez@email.com",
    address: "Plaza España 8, Valencia",
    lastVisit: "2024-01-13",
    status: "active",
    insuranceProvider: "Mapfre",
    medicalHistory: ["Asma", "Migrañas"]
  },
  {
    id: "4",
    name: "José Martínez Ruiz",
    age: 52,
    gender: "M",
    phone: "+34 699 456 789",
    email: "jose.martinez@email.com",
    address: "Calle Cervantes 23, Sevilla",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-24",
    status: "active",
    medicalHistory: ["Artritis"]
  }
];

const Patients = () => {
  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground hover-glow";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "inactive":
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
      case "inactive":
        return "Inactivo";
      default:
        return "Sin estado";
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gestión de Pacientes
            </h1>
            <p className="text-muted-foreground mt-2">
              Administra el historial clínico y datos de tus pacientes
            </p>
          </div>
          <Button className="btn-premium hover-glow">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Paciente
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card shadow-elevated border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nombre, teléfono o email..." 
                  className="pl-10 bg-muted/30 border-border/50 focus:border-primary"
                />
              </div>
              <Button variant="outline" className="hover-glow">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card glow-primary border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">247</div>
              <div className="text-sm text-muted-foreground">Pacientes Activos</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-accent border-accent/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent">15</div>
              <div className="text-sm text-muted-foreground">Nuevos Este Mes</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-gold border-gold/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gold">45</div>
              <div className="text-sm text-muted-foreground">Citas Programadas</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-warning/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning">8</div>
              <div className="text-sm text-muted-foreground">Pendientes</div>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        <Card className="glass-card shadow-elevated border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              Lista de Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPatients.map((patient, index) => (
                <Card 
                  key={patient.id} 
                  className="glass-card hover-glow border-border/30 hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Patient Info */}
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold text-lg">
                            {patient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                            <Badge className={getStatusColor(patient.status)}>
                              {getStatusText(patient.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{patient.age} años, {patient.gender === "M" ? "Masculino" : "Femenino"}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>{patient.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{patient.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Info */}
                      <div className="flex flex-col lg:items-end space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Última visita: {patient.lastVisit}</span>
                        </div>
                        {patient.nextAppointment && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span className="text-accent font-medium">Próxima: {patient.nextAppointment}</span>
                          </div>
                        )}
                        {patient.insuranceProvider && (
                          <Badge variant="outline" className="text-xs">
                            {patient.insuranceProvider}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="hover-glow">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover-glow">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover-glow">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover-glow">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Medical History */}
                    {patient.medicalHistory.length > 0 && (
                      <>
                        <Separator className="my-4 bg-border/50" />
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Historial Médico:</h4>
                          <div className="flex flex-wrap gap-2">
                            {patient.medicalHistory.map((condition, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Patients;