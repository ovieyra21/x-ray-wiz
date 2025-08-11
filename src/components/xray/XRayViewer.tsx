import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Contrast, 
  Sun, 
  Download,
  Maximize2,
  Minimize2,
  Scan,
  Brain
} from "lucide-react";

interface XRayViewerProps {
  imageUrl?: string;
  patientName?: string;
  captureDate?: string;
  aiAnalysis?: {
    findings: string[];
    confidence: number;
    status: "analyzing" | "completed" | "error";
  };
}

export function XRayViewer({ 
  imageUrl = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
  patientName = "Ana García",
  captureDate = "15/01/2024",
  aiAnalysis = {
    findings: ["Caries en molar superior derecho", "Estructura ósea normal"],
    confidence: 87,
    status: "completed"
  }
}: XRayViewerProps) {
  const [zoom, setZoom] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [brightness, setBrightness] = useState([100]);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleZoomIn = () => setZoom([Math.min(zoom[0] + 25, 300)]);
  const handleZoomOut = () => setZoom([Math.max(zoom[0] - 25, 25)]);
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom([100]);
    setContrast([100]);
    setBrightness([100]);
    setRotation(0);
  };

  const imageStyle = {
    transform: `scale(${zoom[0] / 100}) rotate(${rotation}deg)`,
    filter: `contrast(${contrast[0]}%) brightness(${brightness[0]}%)`,
    transition: "transform 0.3s ease, filter 0.3s ease",
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-success text-success-foreground";
    if (confidence >= 75) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="space-y-4">
      {/* AI Analysis Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Análisis por IA</span>
            </CardTitle>
            <Badge className={getConfidenceColor(aiAnalysis.confidence)}>
              {aiAnalysis.confidence}% confianza
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {aiAnalysis.findings.map((finding, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">{finding}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Viewer */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-elevated">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">{patientName}</CardTitle>
              <p className="text-sm text-muted-foreground">Radiografía - {captureDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[50px] text-center">
                {zoom[0]}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Contrast className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={contrast}
                onValueChange={setContrast}
                max={200}
                min={50}
                step={5}
                className="w-20"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={brightness}
                onValueChange={setBrightness}
                max={200}
                min={50}
                step={5}
                className="w-20"
              />
            </div>

            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>

            <Button variant="default" size="sm" className="ml-auto">
              <Scan className="w-4 h-4 mr-2" />
              Analizar con IA
            </Button>
          </div>

          {/* Image Container */}
          <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: "400px" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Radiografía dental"
                className="max-w-full max-h-full object-contain"
                style={imageStyle}
              />
            </div>
          </div>

          {/* Image Info */}
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Zoom: {zoom[0]}% | Contraste: {contrast[0]}% | Brillo: {brightness[0]}%</span>
            <span>Rotación: {rotation}°</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}