import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain,
  Zap,
  Eye,
  FileImage,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Target,
  Microscope,
  Cpu,
  BarChart3,
  Download
} from "lucide-react";

interface AnalysisResult {
  id: string;
  patientName: string;
  imageId: string;
  analysisType: "caries" | "periodontal" | "orthodontic" | "implant" | "pathology";
  status: "processing" | "completed" | "error" | "queued";
  confidence: number;
  processingTime: number;
  findings: {
    severity: "low" | "medium" | "high" | "critical";
    description: string;
    recommendations: string[];
    coordinates?: { x: number; y: number };
  }[];
  createdAt: string;
  completedAt?: string;
}

const mockAnalysis: AnalysisResult[] = [
  {
    id: "1",
    patientName: "Ana García",
    imageId: "IMG_001",
    analysisType: "caries",
    status: "completed",
    confidence: 92,
    processingTime: 45,
    findings: [
      {
        severity: "high",
        description: "Caries profunda en molar superior derecho (16)",
        recommendations: ["Endodoncia", "Corona dental", "Control en 2 semanas"],
        coordinates: { x: 120, y: 80 }
      },
      {
        severity: "medium",
        description: "Caries inicial en premolar inferior izquierdo (35)",
        recommendations: ["Obturación", "Revisión en 3 meses"],
        coordinates: { x: 200, y: 150 }
      }
    ],
    createdAt: "2024-01-15T10:30:00",
    completedAt: "2024-01-15T10:30:45"
  },
  {
    id: "2",
    patientName: "Carlos Rodríguez",
    imageId: "IMG_002",
    analysisType: "periodontal",
    status: "processing",
    confidence: 0,
    processingTime: 0,
    findings: [],
    createdAt: "2024-01-15T11:00:00"
  },
  {
    id: "3",
    patientName: "María López",
    imageId: "IMG_003",
    analysisType: "orthodontic",
    status: "completed",
    confidence: 87,
    processingTime: 67,
    findings: [
      {
        severity: "medium",
        description: "Maloclusión clase II",
        recommendations: ["Tratamiento ortodóncico", "Consulta especialista", "Radiografía cefalométrica"],
      }
    ],
    createdAt: "2024-01-15T09:15:00",
    completedAt: "2024-01-15T09:16:07"
  }
];

const AIAnalysis = () => {
  const getAnalysisTypeColor = (type: AnalysisResult["analysisType"]) => {
    switch (type) {
      case "caries":
        return "bg-destructive text-destructive-foreground";
      case "periodontal":
        return "bg-warning text-warning-foreground";
      case "orthodontic":
        return "bg-primary text-primary-foreground";
      case "implant":
        return "bg-accent text-accent-foreground";
      case "pathology":
        return "bg-gold text-gold-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAnalysisTypeText = (type: AnalysisResult["analysisType"]) => {
    switch (type) {
      case "caries":
        return "Detección de Caries";
      case "periodontal":
        return "Análisis Periodontal";
      case "orthodontic":
        return "Evaluación Ortodóncica";
      case "implant":
        return "Planificación Implantes";
      case "pathology":
        return "Patología Oral";
      default:
        return "Análisis General";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-primary text-primary-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "processing":
        return <Zap className="w-4 h-4 text-warning animate-glow-pulse" />;
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "queued":
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
              Análisis con IA
            </h1>
            <p className="text-muted-foreground mt-2">
              Diagnóstico automático avanzado con inteligencia artificial
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="hover-glow">
              <BarChart3 className="w-5 h-5 mr-2" />
              Estadísticas
            </Button>
            <Button className="btn-gold hover-glow">
              <Brain className="w-5 h-5 mr-2" />
              Nuevo Análisis
            </Button>
          </div>
        </div>

        {/* AI Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card glow-accent border-accent/20">
            <CardContent className="p-6 text-center">
              <Brain className="w-10 h-10 mx-auto mb-3 text-accent animate-float" />
              <div className="text-3xl font-bold text-accent">1,247</div>
              <div className="text-sm text-muted-foreground">Análisis Completados</div>
              <div className="mt-2 text-xs text-success">+23% este mes</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card glow-gold border-gold/20">
            <CardContent className="p-6 text-center">
              <Target className="w-10 h-10 mx-auto mb-3 text-gold animate-float" />
              <div className="text-3xl font-bold text-gold">94.2%</div>
              <div className="text-sm text-muted-foreground">Precisión Promedio</div>
              <div className="mt-2 text-xs text-success">+2.1% mejora</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card glow-primary border-primary/20">
            <CardContent className="p-6 text-center">
              <Cpu className="w-10 h-10 mx-auto mb-3 text-primary animate-float" />
              <div className="text-3xl font-bold text-primary">2.3s</div>
              <div className="text-sm text-muted-foreground">Tiempo Promedio</div>
              <div className="mt-2 text-xs text-success">-15% optimización</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-warning/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-warning animate-float" />
              <div className="text-3xl font-bold text-warning">156</div>
              <div className="text-sm text-muted-foreground">Casos Detectados</div>
              <div className="mt-2 text-xs text-warning">Esta semana</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-muted/30">
            <TabsTrigger value="results" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Resultados de Análisis
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Modelos de IA
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Entrenamiento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            {/* Analysis Results */}
            <Card className="glass-card shadow-elevated border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                  <Microscope className="w-6 h-6 text-accent" />
                  <span>Resultados de Análisis Recientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockAnalysis.map((analysis, index) => (
                    <Card 
                      key={analysis.id} 
                      className="glass-card hover-glow border-border/30 hover:border-accent/50 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                          {/* Analysis Info */}
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(analysis.status)}
                                <h3 className="text-lg font-semibold text-foreground">{analysis.patientName}</h3>
                              </div>
                              <Badge className={getAnalysisTypeColor(analysis.analysisType)}>
                                {getAnalysisTypeText(analysis.analysisType)}
                              </Badge>
                              {analysis.status === "completed" && (
                                <Badge variant="outline" className="text-success border-success">
                                  {analysis.confidence}% confianza
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <FileImage className="w-4 h-4" />
                                <span>ID: {analysis.imageId}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(analysis.createdAt).toLocaleString()}</span>
                              </div>
                              {analysis.completedAt && (
                                <div className="flex items-center space-x-2">
                                  <Zap className="w-4 h-4" />
                                  <span>{analysis.processingTime}s procesamiento</span>
                                </div>
                              )}
                            </div>

                            {/* Processing Status */}
                            {analysis.status === "processing" && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Analizando imagen...</span>
                                  <span className="text-accent">75%</span>
                                </div>
                                <Progress value={75} className="w-full" />
                              </div>
                            )}

                            {/* Findings */}
                            {analysis.findings.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-medium text-foreground">Hallazgos Detectados:</h4>
                                <div className="space-y-3">
                                  {analysis.findings.map((finding, idx) => (
                                    <div key={idx} className="p-4 border border-border/50 rounded-lg bg-muted/20">
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                          <Badge className={getSeverityColor(finding.severity)}>
                                            {finding.severity.toUpperCase()}
                                          </Badge>
                                          {finding.severity === "critical" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                                        </div>
                                        {finding.coordinates && (
                                          <div className="text-xs text-muted-foreground">
                                            Coordenadas: ({finding.coordinates.x}, {finding.coordinates.y})
                                          </div>
                                        )}
                                      </div>
                                      <p className="text-foreground font-medium mb-2">{finding.description}</p>
                                      <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground font-medium">Recomendaciones:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                          {finding.recommendations.map((rec, recIdx) => (
                                            <li key={recIdx} className="text-sm text-muted-foreground">{rec}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-2 lg:ml-6">
                            <Button size="sm" className="hover-glow">
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Imagen
                            </Button>
                            <Button size="sm" variant="outline" className="hover-glow">
                              <Download className="w-4 h-4 mr-2" />
                              Exportar
                            </Button>
                            <Button size="sm" variant="outline" className="hover-glow">
                              <Brain className="w-4 h-4 mr-2" />
                              Re-analizar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card className="glass-card shadow-elevated border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Modelos de IA Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    { name: "CariesNet Pro", version: "v2.1", accuracy: 94.2, specialty: "Detección de Caries" },
                    { name: "PerioAnalyzer", version: "v1.8", accuracy: 91.7, specialty: "Análisis Periodontal" },
                    { name: "OrthoVision", version: "v3.0", accuracy: 89.3, specialty: "Evaluación Ortodóncica" },
                    { name: "PathologyAI", version: "v1.5", accuracy: 87.1, specialty: "Detección de Patologías" }
                  ].map((model, index) => (
                    <Card key={index} className="glass-card hover-glow border-border/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{model.name}</h3>
                            <p className="text-sm text-muted-foreground">{model.specialty}</p>
                          </div>
                          <Badge variant="outline">{model.version}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Precisión</span>
                            <span className="font-medium text-success">{model.accuracy}%</span>
                          </div>
                          <Progress value={model.accuracy} className="w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card className="glass-card shadow-elevated border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Estado del Entrenamiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-accent animate-glow-pulse" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Entrenamiento Continuo</h3>
                  <p className="text-muted-foreground mb-6">
                    Los modelos se entrenan continuamente con nuevos casos para mejorar la precisión
                  </p>
                  <Button className="btn-gold hover-glow">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Ver Métricas de Entrenamiento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AIAnalysis;