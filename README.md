# 🎨 Jkraft 3D - Catálogo Interactivo de Impresiones 3D

Sitio web profesional para showcase de servicios de impresión 3D, construido con tecnologías modernas web.

## 🚀 Demo en Vivo

👉 [Ver Demo](https://vercel.com/juancarlosneutas-projects/jkraft-3d-catalog)

## ✨ Características

- 🎯 **Visualización 3D Interactiva** - 4 modelos GLB intercambiables con drag-to-rotate
- ⚡ **Animaciones Fluidas** - GSAP ScrollTrigger en todas las secciones
- 🎨 **Galería Filtrable** - 8 proyectos con filtros por categoría
- 📋 **Modales Funcionales** - Detalles completos de cada producto
- 📧 **Formulario Avanzado** - Con validación y estados (loading, success)
- 🎪 **2000 Partículas** - Sistema de partículas con colores dinámicos
- 📱 **100% Responsive** - Optimizado para móvil y desktop

## 🛠️ Stack Tecnológico

- **Three.js** - Renderizado 3D y carga de modelos GLB
- **GSAP** - Animaciones y ScrollTrigger
- **Svelte** - Framework reactivo
- **Tailwind CSS** - Estilos utility-first
- **Vite** - Build tool rápido
- **Vercel** - Despliegue y hosting

## 📦 Instalación
```bash
# Clonar repositorio
git clone https://github.com/JuanCNeuta/jkraft-3d-catalog.git

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build producción
npm run build
```

## 🎯 Estructura
```
├── src/
│   ├── components/       # 8 componentes Svelte
│   │   ├── Hero.svelte         # 4 modelos 3D con Three.js
│   │   ├── Gallery.svelte      # Galería filtrable
│   │   ├── Catalog.svelte      # Productos con modales
│   │   ├── Viewer3D.svelte     # Visualizador interactivo
│   │   └── ...
│   └── App.svelte        # Componente principal
├── public/
│   ├── models/           # Archivos GLB
│   └── images/           # Imágenes del proyecto
└── ...
```

## 🎨 Características Destacadas

### Three.js
- Carga de modelos GLB con GLTFLoader
- Sistema de partículas (2000 partículas RGB)
- Iluminación dinámica (PointLight dual)
- Wireframe overlays
- Mouse tracking interactivo

### GSAP
- ScrollTrigger en 6 secciones
- Stagger animations
- Timeline sequences
- Smooth scroll entre secciones

### Svelte
- 9 componentes modulares
- Reactive state management
- Two-way binding en formularios
- Lifecycle hooks optimizados

## 📱 Secciones

1. **Hero** - 4 modelos 3D intercambiables con auto-rotate
2. **Sobre Nosotros** - Features y especificaciones técnicas
3. **Catálogo** - 6 servicios con modales detallados
4. **Galería** - 8 proyectos con filtros funcionales
5. **Visualizador 3D** - 4 modelos drag-to-rotate
6. **Contacto** - Formulario completo con validación

## 📄 Licencia

MIT © 2024 Jkraft 3D

## 👨‍💻 Autor

**Juan Carlos Neuta Montenegro**
- GitHub: [@JuanCNeuta](https://github.com/JuanCNeuta)

---
