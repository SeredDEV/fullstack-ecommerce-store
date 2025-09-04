import express from 'express';
import cors from 'cors';
import { CreateNetworkTools } from './lib/application';
import { Endpoints } from './lib/application/endpoints';
import AuthRouterRegister from './routes/auth/auth.route';

const app = express();

// Middlewares globales
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Configuración para nuestro framework
const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET || 'your-secret-key-here',
    expiresIn: '24h'
  }
};

// Crear herramientas de red y auth
const { networkTools, authTools } = CreateNetworkTools.createTools(config);

// Crear instancia de endpoints
const endpoints = new Endpoints({ networkTools, authTools });

// Registrar routers siguiendo la estructura de referencia
const authRouter = new AuthRouterRegister();
authRouter.register({ server: app, endpoints });

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API Tienda Online funcionando!',
    version: '2.0.0',
    framework: 'Custom Framework (Reference Project Structure)',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      auth: {
        login: 'POST /api/auth/login'
      }
    }
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'El servidor está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Middleware de manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.originalUrl
  });
});

// Middleware de manejo de errores globales
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔧 Framework: Estructura del Proyecto de Referencia`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET  / - Información de la API`);
  console.log(`   GET  /health - Health check`);
  console.log(`   POST /api/auth/login - Iniciar sesión`);
  console.log(`\n✅ Estructura granular igual al proyecto de referencia`);
});

export default app;
