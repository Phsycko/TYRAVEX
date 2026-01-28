# TYRAVEX - Instrucciones del Software

## 📋 Descripción General

TYRAVEX es un sistema de gestión hotelera integral diseñado para optimizar las operaciones de hoteles modernos. El software proporciona una plataforma completa para la administración de huéspedes, habitaciones, personal y servicios.

## 🎯 Características Principales

### 1. **Gestión de Huéspedes**
- Portal WiFi cautivo para conexión de huéspedes
- Dashboard de control de habitación (luces, clima, TV)
- Sistema de comunicación directa con recepción
- Gestión de solicitudes y peticiones en tiempo real

### 2. **Panel de Recepción**
- Monitoreo en tiempo real de huéspedes conectados
- Gestión de solicitudes pendientes y en progreso
- Sistema de notificaciones instantáneas
- Control de estado de habitaciones

### 3. **Panel de Administración**
- Gestión completa de habitaciones (crear, editar, eliminar)
- Administración de personal y roles
- Control de categorías de habitaciones
- Reportes de daños y mantenimiento
- Historial de limpieza y servicios

### 4. **Gestión de Personal**
- Asignación de roles (recepción, limpieza, mantenimiento)
- Control de disponibilidad del personal
- Seguimiento de tareas asignadas

## 🚀 Instalación

### Requisitos Previos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Phsycko/TYRAVEX.git
cd TYRAVEX
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Acceder a la aplicación**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
TYRAVEX/
├── app/                    # Aplicación Next.js
│   ├── admin/             # Panel de administración
│   ├── dashboard/         # Dashboard de recepción
│   ├── huespedes/         # Interfaz de huéspedes
│   └── login/             # Sistema de autenticación
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y stores
│   ├── stores/           # Gestión de estado global
│   └── types/            # Definiciones TypeScript
├── public/               # Archivos estáticos
├── server.js             # Servidor Express personalizado
└── package.json          # Dependencias del proyecto
```

## 🔧 Configuración

### Variables de Entorno

```env
# Base de datos (si aplica)
DATABASE_URL=

# Autenticación
JWT_SECRET=your_secret_key_here

# Puerto del servidor
PORT=3000

# Modo de desarrollo
NODE_ENV=development
```

## 💻 Uso del Sistema

### Para Administradores

1. **Iniciar sesión** con credenciales de administrador
2. **Acceder al panel de administración** (`/admin`)
3. **Gestionar habitaciones**: Crear, editar o eliminar habitaciones
4. **Administrar personal**: Asignar roles y gestionar disponibilidad
5. **Revisar reportes**: Daños, limpieza, mantenimiento

### Para Recepcionistas

1. **Iniciar sesión** con credenciales de recepción
2. **Acceder al dashboard** (`/dashboard`)
3. **Monitorear huéspedes**: Ver conexiones activas
4. **Gestionar solicitudes**: Atender peticiones en tiempo real
5. **Actualizar estados**: Marcar solicitudes como completadas

### Para Huéspedes

1. **Conectarse al WiFi** del hotel
2. **Acceder al portal** automáticamente
3. **Controlar la habitación**: Ajustar luces, clima, TV
4. **Enviar solicitudes**: Comunicarse con recepción
5. **Recibir confirmaciones**: Notificaciones en tiempo real

## 🔐 Autenticación y Roles

### Roles Disponibles
- **Admin**: Acceso completo al sistema
- **Recepción**: Gestión de huéspedes y solicitudes
- **Limpieza**: Visualización de tareas de limpieza
- **Mantenimiento**: Gestión de reportes de daños

### Credenciales por Defecto
```
Admin:
  Usuario: admin@tyravex.com
  Contraseña: admin123

Recepción:
  Usuario: recepcion@tyravex.com
  Contraseña: recepcion123
```

> ⚠️ **Importante**: Cambiar las credenciales por defecto en producción

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Producción
npm run build           # Compilar para producción
npm start               # Iniciar servidor de producción

# Utilidades
npm run lint            # Ejecutar linter
npm run type-check      # Verificar tipos TypeScript
```

## 📊 API Endpoints

### Huéspedes
```
POST   /api/guest/connect      # Conectar huésped
POST   /api/guest/request      # Crear solicitud
GET    /api/guests             # Obtener todos los huéspedes
```

### Habitaciones
```
GET    /api/rooms              # Listar habitaciones
POST   /api/rooms              # Crear habitación
PUT    /api/rooms/:id          # Actualizar habitación
DELETE /api/rooms/:id          # Eliminar habitación
```

### Personal
```
GET    /api/staff              # Listar personal
POST   /api/staff              # Crear empleado
PUT    /api/staff/:id          # Actualizar empleado
DELETE /api/staff/:id          # Eliminar empleado
```

## 🎨 Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: CSS Modules, Tailwind CSS (opcional)
- **Estado**: Svelte Stores (para gestión de estado)
- **Backend**: Express.js (servidor personalizado)
- **Autenticación**: JWT
- **Base de datos**: (Por definir según necesidades)

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verificar que el puerto 3000 esté disponible
netstat -ano | findstr :3000

# Cambiar el puerto en .env si es necesario
PORT=3001
```

### Errores de dependencias
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas de autenticación
```bash
# Verificar que JWT_SECRET esté configurado
# Limpiar cookies del navegador
# Verificar credenciales en la base de datos
```

## 📝 Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- **Email**: support@tyravex.com
- **Issues**: https://github.com/Phsycko/TYRAVEX/issues
- **Documentación**: https://docs.tyravex.com

## 🔄 Actualizaciones

### Versión Actual: 1.0.0

#### Próximas Características
- [ ] Integración con sistemas de pago
- [ ] App móvil nativa
- [ ] Sistema de reportes avanzados
- [ ] Integración con IoT para control de habitaciones
- [ ] Multi-idioma
- [ ] Dashboard de analytics

---

**Desarrollado con ❤️ para la industria hotelera moderna**
