import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { XRayViewer } from "@/components/xray/XRayViewer";
import { 
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  FileImage,
  Brain,
  Download,
  Share2,
  Eye,
  MoreVertical,
  Zap
} from "lucide-react";

interface XRayImage {
  id: string;
  patientName: string;
  patientId: string;
  captureDate: string;
  imageType: "panoramic" | "bitewing" | "periapical" | "cephalometric";
  imageUrl: string;
  thumbnailUrl: string;
  aiAnalysis?: {
    status: "pending" | "analyzing" | "completed" | "error";
    confidence?: number;
    findings: string[];
  };
  tags: string[];
  notes?: string;
}

const mockXRays: XRayImage[] = [
  {
    id: "1",
    patientName: "Ana García",
    patientId: "P001",
    captureDate: "2024-01-15",
    imageType: "panoramic",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    aiAnalysis: {
      status: "completed",
      confidence: 87,
      findings: ["Caries en molar superior derecho", "Estructura ósea normal"]
    },
    tags: ["rutina", "control"],
    notes: "Paciente reporta molestias en zona superior derecha"
  },
  {
    id: "2",
    patientName: "Carlos Rodríguez",
    patientId: "P002",
    captureDate: "2024-01-14",
    imageType: "bitewing",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
    aiAnalysis: {
      status: "analyzing",
      findings: []
    },
    tags: ["urgencia", "dolor"],
    notes: "Evaluación urgente por dolor agudo"
  },
  {
    id: "3",
    patientName: "María López",
    patientId: "P003",
    captureDate: "2024-01-13",
    imageType: "periapical",
    imageUrl: "https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=800&h=600&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=300&h=200&fit=crop",
    aiAnalysis: {
      status: "completed",
      confidence: 92,
      findings: ["Endodoncia previa en buen estado", "Sin signos de infección"]
    },
    tags: ["seguimiento", "endodoncia"]
  }
];

const XRays = () => {
  const getTypeColor = (type: XRayImage["imageType"]) => {
    switch (type) {
      case "panoramic":
        return "bg-primary text-primary-foreground";
      case "bitewing":
        return "bg-accent text-accent-foreground";
      case "periapical":
        return "bg-gold text-gold-foreground";
      case "cephalometric":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeText = (type: XRayImage["imageType"]) => {
    switch (type) {
      case "panoramic":
        return "Panorámica";
      case "bitewing":
        return "Bitewing";
      case "periapical":
        return "Periapical";
      case "cephalometric":
        return "Cefalométrica";
      default:
        return "Desconocido";
    }
  };

  const getAnalysisStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "analyzing":
        return "bg-warning text-warning-foreground animate-glow-pulse";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "error":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Radiografías Dentales
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestiona y analiza las radiografías de tus pacientes con IA
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="hover-glow">
              <Brain className="w-5 h-5 mr-2" />
              Análisis Masivo
            </Button>
            <Button className="btn-premium hover-glow">
              <Upload className="w-5 h-5 mr-2" />
              Subir Radiografía
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <Card className="glass-card shadow-elevated border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por paciente, fecha o tipo..." 
                  className="pl-10 bg-muted/30 border-border/50 focus:border-primary"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="hover-glow">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" className="hover-glow">
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="hover-glow">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card glow-primary border-primary/20 text-center">
            <CardContent className="p-6">
              <FileImage className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">1,234</div>
              <div className="text-sm text-muted-foreground">Total Radiografías</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-accent border-accent/20 text-center">
            <CardContent className="p-6">
              <Brain className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-accent">89</div>
              <div className="text-sm text-muted-foreground">Análisis IA Completados</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-gold border-gold/20 text-center">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 mx-auto mb-2 text-gold" />
              <div className="text-2xl font-bold text-gold">15</div>
              <div className="text-sm text-muted-foreground">Casos Detectados</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-warning/20 text-center">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-warning">23</div>
              <div className="text-sm text-muted-foreground">Esta Semana</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-muted/30">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Galería de Imágenes
            </TabsTrigger>
            <TabsTrigger value="viewer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Visor Avanzado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockXRays.map((xray, index) => (
                <Card 
                  key={xray.id} 
                  className="glass-card hover-glow border-border/30 hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getTypeColor(xray.imageType)}>
                        {getTypeText(xray.imageType)}
                      </Badge>
                      {xray.aiAnalysis && (
                        <Badge className={getAnalysisStatusColor(xray.aiAnalysis.status)}>
                          {xray.aiAnalysis.status === "analyzing" && <Zap className="w-3 h-3 mr-1" />}
                          IA: {xray.aiAnalysis.status === "completed" ? `${xray.aiAnalysis.confidence}%` : xray.aiAnalysis.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    {/* Image */}
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-black">
                      <img 
                        src={xray.thumbnailUrl} 
                        alt={`Radiografía de ${xray.patientName}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                          <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/20">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/20">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/20">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/20">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{xray.patientName}</h3>
                        <p className="text-sm text-muted-foreground">ID: {xray.patientId} • {xray.captureDate}</p>
                      </div>

                      {/* AI Findings */}
                      {xray.aiAnalysis?.findings && xray.aiAnalysis.findings.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Hallazgos IA:</h4>
                          <div className="space-y-1">
                            {xray.aiAnalysis.findings.map((finding, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="text-muted-foreground">{finding}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {xray.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Notes */}
                      {xray.notes && (
                        <p className="text-xs text-muted-foreground italic bg-muted/30 p-2 rounded">
                          "{xray.notes}"
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="viewer" className="space-y-6">
            <XRayViewer />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default XRays;