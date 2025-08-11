import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator as CalculatorIcon,
  Syringe,
  User,
  Weight,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Minus,
  RotateCcw,
  Info
} from "lucide-react";

interface AnestheticType {
  name: string;
  concentration: string;
  maxDose: number; // mg/kg
  duration: string;
  onset: string;
  color: string;
}

const anestheticTypes: AnestheticType[] = [
  {
    name: "Lidocaína",
    concentration: "2%",
    maxDose: 4.4,
    duration: "60-120 min",
    onset: "2-5 min",
    color: "bg-primary text-primary-foreground"
  },
  {
    name: "Articaína",
    concentration: "4%",
    maxDose: 7,
    duration: "45-90 min",
    onset: "1-3 min",
    color: "bg-accent text-accent-foreground"
  },
  {
    name: "Mepivacaína",
    concentration: "3%",
    maxDose: 4.4,
    duration: "90-180 min",
    onset: "2-4 min",
    color: "bg-gold text-gold-foreground"
  },
  {
    name: "Bupivacaína",
    concentration: "0.5%",
    maxDose: 2,
    duration: "240-480 min",
    onset: "5-10 min",
    color: "bg-warning text-warning-foreground"
  }
];

const Calculator = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-warning bg-clip-text text-transparent">
              Calculadora Clínica
            </h1>
            <p className="text-muted-foreground mt-2">
              Herramientas de cálculo para dosificación y planificación dental
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card glow-gold border-gold/20 text-center">
            <CardContent className="p-6">
              <Calculator className="w-8 h-8 mx-auto mb-2 text-gold" />
              <div className="text-2xl font-bold text-gold">4</div>
              <div className="text-sm text-muted-foreground">Anestésicos</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-primary border-primary/20 text-center">
            <CardContent className="p-6">
              <Syringe className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">247</div>
              <div className="text-sm text-muted-foreground">Cálculos Hoy</div>
            </CardContent>
          </Card>
          <Card className="glass-card glow-accent border-accent/20 text-center">
            <CardContent className="p-6">
              <Weight className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-accent">70kg</div>
              <div className="text-sm text-muted-foreground">Peso Promedio</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-success/20 text-center">
            <CardContent className="p-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-success">99.2%</div>
              <div className="text-sm text-muted-foreground">Precisión</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Calculator */}
        <Tabs defaultValue="anesthetic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-muted/30">
            <TabsTrigger value="anesthetic" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground">
              Dosis Anestésica
            </TabsTrigger>
            <TabsTrigger value="timing" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground">
              Tiempos de Tratamiento
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-gold data-[state=active]:text-gold-foreground">
              Materiales Dentales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="anesthetic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Data Input */}
              <Card className="glass-card shadow-elevated border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                    <User className="w-6 h-6 text-gold" />
                    <span>Datos del Paciente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Peso del Paciente (kg)</label>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input 
                        type="number" 
                        placeholder="70" 
                        className="text-center bg-muted/30 border-border/50 focus:border-gold"
                      />
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Edad (años)</label>
                    <Input 
                      type="number" 
                      placeholder="35" 
                      className="bg-muted/30 border-border/50 focus:border-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Condiciones Médicas</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Hipertensión", "Diabetes", "Cardiopatía", "Alergia", "Embarazo", "Ninguna"].map((condition, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          size="sm" 
                          className="justify-start hover-glow"
                        >
                          {condition}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Tipo de Procedimiento</label>
                    <div className="space-y-2">
                      {["Extracción simple", "Extracción compleja", "Endodoncia", "Implante", "Periodontal"].map((procedure, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start hover-glow"
                        >
                          {procedure}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Anesthetic Selection and Results */}
              <Card className="glass-card shadow-elevated border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                    <Syringe className="w-6 h-6 text-gold" />
                    <span>Selección de Anestésico</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-3">
                    {anestheticTypes.map((anesthetic, index) => (
                      <Card 
                        key={index} 
                        className="glass-card hover-glow border-border/30 hover:border-gold/50 cursor-pointer transition-all duration-300"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Badge className={anesthetic.color}>
                                  {anesthetic.name}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {anesthetic.concentration}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                <div>Dosis máx: {anesthetic.maxDose} mg/kg</div>
                                <div>Inicio: {anesthetic.onset}</div>
                                <div>Duración: {anesthetic.duration}</div>
                              </div>
                            </div>
                            <Button size="sm" className="hover-glow">
                              Seleccionar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calculation Results */}
            <Card className="glass-card glow-gold border-gold/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                  <Calculator className="w-6 h-6 text-gold" />
                  <span>Resultado del Cálculo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-gold/20 to-warning/20 rounded-lg border border-gold/30">
                    <div className="text-3xl font-bold text-gold mb-2">3.6 ml</div>
                    <div className="text-sm text-muted-foreground">Volumen Recomendado</div>
                    <div className="text-xs text-gold mt-1">Lidocaína 2%</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-success/20 to-accent/20 rounded-lg border border-success/30">
                    <div className="text-3xl font-bold text-success mb-2">308 mg</div>
                    <div className="text-sm text-muted-foreground">Dosis Total</div>
                    <div className="text-xs text-success mt-1">Dentro del límite seguro</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-primary/30">
                    <div className="text-3xl font-bold text-primary mb-2">1.8</div>
                    <div className="text-sm text-muted-foreground">Cartuchos Necesarios</div>
                    <div className="text-xs text-primary mt-1">Redondear a 2</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success">Dosis Segura</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        La dosis calculada está dentro de los límites seguros para un paciente de 70kg.
                        Duración estimada del efecto: 60-120 minutos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-warning">Recomendaciones</h4>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Realizar aspiración antes de la inyección</li>
                        <li>• Inyectar lentamente (1ml/min)</li>
                        <li>• Monitorizar signos vitales durante el procedimiento</li>
                        <li>• Tener disponible kit de emergencia</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <Button variant="outline" className="hover-glow">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Nuevo Cálculo
                  </Button>
                  <Button className="btn-gold hover-glow">
                    <Calculator className="w-4 h-4 mr-2" />
                    Guardar Resultado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timing" className="space-y-6">
            <Card className="glass-card shadow-elevated border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Calculadora de Tiempos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gold animate-float" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Próximamente</h3>
                  <p className="text-muted-foreground">
                    Calculadora de tiempos de tratamiento y programación de citas
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card className="glass-card shadow-elevated border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Cálculo de Materiales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Weight className="w-16 h-16 mx-auto mb-4 text-gold animate-float" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Próximamente</h3>
                  <p className="text-muted-foreground">
                    Calculadora de materiales dentales y proporciones de mezcla
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Calculator;