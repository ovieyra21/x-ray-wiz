import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentPatients } from "@/components/dashboard/RecentPatients";
import { XRayViewer } from "@/components/xray/XRayViewer";
import { 
  Users, 
  ImageIcon, 
  Calendar, 
  TrendingUp,
  Brain,
  Stethoscope
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido al sistema de análisis radiográfico dental
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Stethoscope className="w-4 h-4" />
            <span>Dr. Elena Martínez - Clínica Dental</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Pacientes Activos"
            value="247"
            change="+12% este mes"
            trend="up"
            icon={<Users className="w-5 h-5 text-primary" />}
          />
          <StatCard
            title="Radiografías Analizadas"
            value="1,234"
            change="+8% esta semana"
            trend="up"
            icon={<ImageIcon className="w-5 h-5 text-primary" />}
          />
          <StatCard
            title="Citas Programadas"
            value="45"
            change="Próximos 7 días"
            trend="neutral"
            icon={<Calendar className="w-5 h-5 text-primary" />}
          />
          <StatCard
            title="Análisis IA Completados"
            value="89"
            change="+15% precisión"
            trend="up"
            icon={<Brain className="w-5 h-5 text-primary" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Patients */}
          <div className="lg:col-span-1">
            <RecentPatients />
          </div>

          {/* Right Column - X-Ray Viewer */}
          <div className="lg:col-span-2">
            <XRayViewer />
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Tiempo Promedio de Análisis"
            value="2.3 min"
            change="-15% optimización"
            trend="up"
            icon={<TrendingUp className="w-5 h-5 text-accent" />}
          />
          <StatCard
            title="Casos Detectados por IA"
            value="34"
            change="Esta semana"
            trend="neutral"
            icon={<Brain className="w-5 h-5 text-accent" />}
          />
          <StatCard
            title="Satisfacción del Paciente"
            value="4.8/5"
            change="+0.2 puntos"
            trend="up"
            icon={<Stethoscope className="w-5 h-5 text-accent" />}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
