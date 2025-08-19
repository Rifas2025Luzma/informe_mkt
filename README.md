# Dashboard de Marketing Digital

Una aplicación web completa desarrollada en PHP para procesar y visualizar datos publicitarios de Google Sheets, generando un dashboard interactivo con métricas detalladas y gráficos profesionales.

## 🚀 Características

- **Carga de datos flexible**: Soporte para Google Sheets públicos y archivos CSV
- **Dashboard interactivo**: Métricas consolidadas con visualizaciones profesionales
- **Análisis detallado**: Tabla filtrable y ordenable con datos granulares por campaña
- **Gráficos dinámicos**: Visualizaciones interactivas usando Chart.js
- **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **Exportación de datos**: Funcionalidad de exportación a CSV
- **Interfaz moderna**: Diseño profesional con animaciones suaves

## 📊 Métricas Incluidas

### Dashboard Principal
- Inversión total consolidada (Meta Ads + Google Ads)
- Impresiones totales
- Clicks totales con CTR promedio
- Conversiones totales con ROAS promedio
- Comparativa visual entre plataformas

### Análisis Detallado
- Vista granular por campaña
- Filtros por fecha, plataforma y tipo
- Métricas: alcance, frecuencia, CPM, CPC, CTR, ROAS
- Ordenamiento dinámico por columnas

## 🛠️ Requisitos Técnicos

- **PHP**: 7.4 o superior
- **Servidor web**: Apache/Nginx con soporte PHP
- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Conexión a internet**: Para cargar datos de Google Sheets y librerías CDN

## 📋 Estructura de Datos Requerida

Tu Google Sheets debe contener las siguientes columnas (en este orden):

| Columna | Tipo | Descripción |
|---------|------|-------------|
| fecha | YYYY-MM-DD | Fecha de la campaña |
| plataforma | Texto | "Meta Ads" o "Google Ads" |
| nombre_campana | Texto | Nombre de la campaña |
| tipo_campana | Texto | Tipo de campaña |
| inversion | Número | Inversión en USD |
| impresiones | Número | Número de impresiones |
| clicks | Número | Número de clicks |
| conversiones | Número | Número de conversiones |
| alcance | Número | Alcance de la campaña |
| frecuencia | Número | Frecuencia promedio |
| cpm | Número | Costo por mil impresiones |
| cpc | Número | Costo por click |
| ctr | Número | Click-through rate (%) |
| roas | Número | Return on ad spend |

## 🚀 Instalación

### Opción 1: Hosting PHP Tradicional

1. **Descarga los archivos**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd marketing-dashboard
   ```

2. **Sube los archivos a tu servidor**
   - Sube todos los archivos a la carpeta raíz de tu hosting
   - Asegúrate de que el servidor tenga PHP 7.4+ habilitado

3. **Configura permisos**
   ```bash
   chmod 755 includes/
   chmod 644 includes/*.php
   chmod 755 assets/
   ```

4. **Accede a la aplicación**
   - Visita `http://tu-dominio.com/index.php`

### Opción 2: Servidor Local (XAMPP/WAMP/MAMP)

1. **Instala XAMPP/WAMP/MAMP**
   - Descarga e instala según tu sistema operativo

2. **Copia los archivos**
   ```bash
   cp -r marketing-dashboard/ /path/to/xampp/htdocs/
   ```

3. **Inicia el servidor**
   - Inicia Apache desde el panel de control
   - Visita `http://localhost/marketing-dashboard/`

## 📖 Guía de Uso

### 1. Preparar Google Sheets

1. **Crea un Google Sheets** con la estructura de datos requerida
2. **Haz el documento público**:
   - Clic en "Compartir" → "Cambiar a cualquier persona con el enlace"
   - Asegúrate de que tenga permisos de "Lector"
3. **Copia la URL** del documento

### 2. Cargar Datos

1. **Desde Google Sheets**:
   - Pega la URL en el campo correspondiente
   - Clic en "Procesar Datos"

2. **Desde archivo CSV**:
   - Selecciona tu archivo CSV local
   - Clic en "Procesar Datos"

### 3. Analizar Resultados

1. **Dashboard Principal**: Revisa las métricas consolidadas
2. **Gráficos**: Analiza la distribución por plataforma y tendencias temporales
3. **Tabla Detallada**: Filtra y ordena los datos según tus necesidades
4. **Exportar**: Descarga los datos filtrados en formato CSV

## 🎨 Personalización

### Colores y Estilos

Edita `assets/css/style.css` para personalizar:

```css
:root {
    --primary-color: #2563eb;    /* Color principal */
    --secondary-color: #64748b;  /* Color secundario */
    --success-color: #10b981;    /* Color de éxito */
    /* ... más variables */
}
```

### Métricas Adicionales

Para agregar nuevas métricas, edita `includes/functions.php`:

```php
function calculate_metrics($data) {
    // Agregar nuevos cálculos aquí
    $metrics['nueva_metrica'] = calcular_nueva_metrica($data);
    return $metrics;
}
```

## 🔧 Solución de Problemas

### Error: "No se pudieron obtener datos"

1. **Verifica la URL**: Asegúrate de que sea una URL válida de Google Sheets
2. **Permisos**: El documento debe ser público con permisos de lectura
3. **Formato**: Verifica que las columnas coincidan con la estructura requerida

### Error: "Archivo CSV inválido"

1. **Codificación**: Asegúrate de que el CSV esté en UTF-8
2. **Delimitadores**: Usa comas (,) como separadores
3. **Encabezados**: La primera fila debe contener los nombres de columnas exactos

### Problemas de Rendimiento

1. **Límite de datos**: Para archivos muy grandes (>1000 filas), considera dividir los datos
2. **Memoria PHP**: Aumenta `memory_limit` en php.ini si es necesario
3. **Timeout**: Ajusta `max_execution_time` para archivos grandes

## 📱 Compatibilidad Móvil

La aplicación está completamente optimizada para dispositivos móviles:

- **Diseño responsive**: Se adapta automáticamente al tamaño de pantalla
- **Navegación táctil**: Optimizada para interacciones táctiles
- **Gráficos móviles**: Los gráficos se redimensionan automáticamente
- **Tablas scrollables**: Las tablas grandes son navegables horizontalmente

## 🔒 Seguridad

- **Validación de entrada**: Todos los datos son validados y sanitizados
- **Protección XSS**: Salida HTML escapada automáticamente
- **Límites de archivo**: Restricciones en tamaño y tipo de archivos
- **Sin base de datos**: No se almacenan datos sensibles

## 🚀 Despliegue en Producción

### Hosting Compartido

1. **Sube archivos** via FTP/cPanel
2. **Configura dominio** para apuntar a index.php
3. **Verifica PHP** versión y extensiones

### VPS/Servidor Dedicado

```bash
# Instalar dependencias
sudo apt update
sudo apt install apache2 php libapache2-mod-php

# Configurar virtual host
sudo nano /etc/apache2/sites-available/dashboard.conf

# Habilitar sitio
sudo a2ensite dashboard.conf
sudo systemctl reload apache2
```

## 📈 Optimización

### Rendimiento

- **Cache**: Implementa cache de archivos para datos frecuentes
- **CDN**: Usa CDN para librerías externas
- **Compresión**: Habilita gzip en el servidor
- **Minificación**: Minifica CSS y JS para producción

### SEO (si es público)

- **Meta tags**: Agrega meta descripción y keywords
- **Schema markup**: Implementa datos estructurados
- **Sitemap**: Genera sitemap.xml si tienes múltiples páginas

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crea** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:

- **Issues**: Crea un issue en GitHub
- **Email**: [tu-email@ejemplo.com]
- **Documentación**: Consulta este README

## 🔄 Changelog

### v1.0.0 (2024-01-XX)
- ✅ Lanzamiento inicial
- ✅ Soporte para Google Sheets y CSV
- ✅ Dashboard interactivo completo
- ✅ Gráficos con Chart.js
- ✅ Diseño responsive
- ✅ Funcionalidad de exportación

---

**Desarrollado con ❤️ para optimizar tus campañas de marketing digital**