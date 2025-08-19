# Dashboard de Marketing Digital - Versión Estática

Una aplicación web estática desarrollada con HTML5, CSS3 y JavaScript vanilla para procesar y visualizar datos publicitarios de Google Sheets, generando un dashboard interactivo con métricas detalladas y gráficos profesionales.

## 🚀 Características

- **✅ Compatible con GitHub Pages**: Versión 100% estática sin dependencias de servidor
- **📊 Carga de datos flexible**: Soporte para Google Sheets públicos y archivos CSV
- **📈 Dashboard interactivo**: Métricas consolidadas con visualizaciones profesionales
- **🔍 Análisis detallado**: Tabla filtrable y ordenable con datos granulares por campaña
- **📱 Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **⚡ Carga rápida**: Sin dependencias de servidor, carga instantánea
- **🎨 Interfaz moderna**: Diseño profesional con animaciones suaves

## 🌐 Demo en Vivo

Visita la demo: [https://tu-usuario.github.io/marketing-dashboard](https://tu-usuario.github.io/marketing-dashboard)

## 📊 Métricas Incluidas

### Dashboard Principal
- Inversión total consolidada (Meta Ads + Google Ads)
- Impresiones totales
- Clicks totales con CTR promedio
- Conversiones totales con ROAS promedio
- Comparativa visual entre plataformas

### Análisis Detallado
- Vista granular por campaña
- Filtros por plataforma y búsqueda en tiempo real
- Métricas: alcance, frecuencia, CPM, CPC, CTR, ROAS
- Ordenamiento dinámico por columnas
- Exportación a CSV

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica moderna
- **CSS3**: Grid, Flexbox, animaciones CSS
- **JavaScript ES6+**: Vanilla JavaScript sin frameworks
- **Chart.js**: Gráficos interactivos
- **PapaParse**: Procesamiento de CSV
- **Font Awesome**: Iconografía profesional

## 📋 Estructura de Datos

Tu Google Sheets debe contener estas columnas:

| Columna | Tipo | Ejemplo |
|---------|------|---------|
| fecha | YYYY-MM-DD | 2024-01-15 |
| plataforma | Texto | Meta Ads / Google Ads |
| nombre_campana | Texto | Campaña Navidad 2024 |
| tipo_campana | Texto | Conversiones |
| inversion | Número | 1500.00 |
| impresiones | Número | 45000 |
| clicks | Número | 1200 |
| conversiones | Número | 85 |
| alcance | Número | 35000 |
| frecuencia | Número | 1.30 |
| cpm | Número | 33.33 |
| cpc | Número | 1.25 |
| ctr | Número | 2.67 |
| roas | Número | 4.25 |

## 🚀 Despliegue en GitHub Pages

### Opción 1: Fork este repositorio

1. **Fork** este repositorio
2. Ve a **Settings** → **Pages**
3. Selecciona **Deploy from a branch**
4. Elige **main** branch
5. ¡Listo! Tu dashboard estará en `https://tu-usuario.github.io/marketing-dashboard`

### Opción 2: Crear nuevo repositorio

1. **Crea un nuevo repositorio** en GitHub
2. **Clona** este código a tu repositorio
3. **Habilita GitHub Pages** en Settings → Pages
4. **Selecciona la rama main** como fuente

```bash
git clone https://github.com/tu-usuario/marketing-dashboard.git
cd marketing-dashboard
git remote set-url origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

## 📖 Guía de Uso

### 1. Preparar Google Sheets

1. **Crea un Google Sheets** con la estructura de datos requerida
2. **Haz el documento público**:
   - Clic en "Compartir" → "Cambiar a cualquier persona con el enlace"
   - Permisos de "Lector"
3. **Copia la URL** del documento

### 2. Usar el Dashboard

1. **Visita tu GitHub Pages** URL
2. **Opción A**: Pega la URL de Google Sheets y clic en "Procesar Datos"
3. **Opción B**: Sube un archivo CSV local
4. **Opción C**: Clic en "Cargar Datos de Demo" para probar

### 3. Analizar Resultados

- **Dashboard**: Revisa métricas consolidadas
- **Gráficos**: Analiza distribución y tendencias
- **Tabla**: Filtra, ordena y busca campañas específicas
- **Exportar**: Descarga datos filtrados en CSV

## 🔧 Personalización

### Cambiar Colores

Edita las variables CSS en `assets/css/style.css`:

```css
:root {
    --primary-color: #2563eb;    /* Azul principal */
    --secondary-color: #64748b;  /* Gris secundario */
    --success-color: #10b981;    /* Verde éxito */
    /* Personaliza según tu marca */
}
```

### Agregar Nuevas Métricas

Modifica la función `updateMetrics()` en `assets/js/app.js`:

```javascript
function updateMetrics(data) {
    // Agregar cálculos personalizados
    const customMetric = calculateCustomMetric(data);
    // Actualizar UI
}
```

### Modificar Datos de Demo

Edita el array `DEMO_DATA` en `assets/js/app.js` con tus propios datos de ejemplo.

## 📱 Características Móviles

- **Responsive Design**: Se adapta a cualquier pantalla
- **Touch Friendly**: Optimizado para interacciones táctiles
- **Gráficos Móviles**: Charts responsivos automáticamente
- **Navegación Intuitiva**: UX optimizada para móviles

## 🔒 Privacidad y Seguridad

- **Sin servidor**: Todo se procesa en el navegador del usuario
- **No se almacenan datos**: Los datos no se guardan en ningún servidor
- **CORS Proxy**: Usa AllOrigins para acceder a Google Sheets de forma segura
- **Solo lectura**: No se modifican los documentos originales

## 🐛 Solución de Problemas

### Error: "No se pudieron obtener datos"

1. **Verifica la URL**: Debe ser una URL válida de Google Sheets
2. **Documento público**: Asegúrate de que tenga permisos de lectura pública
3. **Formato correcto**: Verifica que las columnas coincidan exactamente

### Error: "Archivo CSV inválido"

1. **Codificación UTF-8**: Guarda el CSV en UTF-8
2. **Separadores**: Usa comas (,) como delimitadores
3. **Encabezados**: Primera fila debe tener nombres exactos de columnas

### Gráficos no se muestran

1. **Datos válidos**: Verifica que hay datos numéricos
2. **JavaScript habilitado**: Asegúrate de que JS esté activo
3. **Consola del navegador**: Revisa errores en F12

## 🚀 Optimización

### Rendimiento
- **Lazy Loading**: Los gráficos se cargan solo cuando hay datos
- **Debounce**: Búsqueda optimizada con retraso
- **Animaciones CSS**: Transiciones suaves sin JavaScript

### SEO (Opcional)
```html
<!-- Agregar en <head> para SEO -->
<meta name="description" content="Dashboard de Marketing Digital - Análisis de campañas publicitarias">
<meta name="keywords" content="marketing, dashboard, analytics, publicidad">
```

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b feature/nueva-funcionalidad`
3. **Commit**: `git commit -am 'Agregar nueva funcionalidad'`
4. **Push**: `git push origin feature/nueva-funcionalidad`
5. **Pull Request**: Crea un PR con descripción detallada

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/marketing-dashboard/issues)
- **Documentación**: Este README
- **Demo**: Datos de ejemplo incluidos

## 🔄 Actualizaciones

### v2.0.0 (Actual)
- ✅ Versión estática para GitHub Pages
- ✅ Sin dependencias de servidor
- ✅ Procesamiento 100% client-side
- ✅ CORS proxy para Google Sheets
- ✅ Datos de demo integrados

### Próximas versiones
- 🔄 Más tipos de gráficos
- 🔄 Filtros avanzados por fecha
- 🔄 Comparativas entre períodos
- 🔄 Exportación a PDF

---

**🎉 ¡Tu dashboard está listo para GitHub Pages!**

Simplemente haz push a tu repositorio y habilita GitHub Pages para tener tu dashboard funcionando en minutos.