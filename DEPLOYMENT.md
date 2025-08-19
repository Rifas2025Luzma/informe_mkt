# Guía de Despliegue - Dashboard de Marketing Digital

## 🚀 Opciones de Despliegue

### ⚠️ Importante: GitHub Pages Limitación

**GitHub Pages solo soporta sitios estáticos** (HTML, CSS, JS), pero esta aplicación requiere PHP para el procesamiento del servidor. Por lo tanto, **no es posible desplegar directamente en GitHub Pages**.

## 🌐 Alternativas de Hosting Recomendadas

### 1. Hosting PHP Gratuito

#### **InfinityFree** (Recomendado)
- ✅ PHP 7.4+ gratuito
- ✅ Sin anuncios forzados
- ✅ SSL gratuito
- ✅ 5GB de espacio

**Pasos:**
1. Regístrate en [infinityfree.net](https://infinityfree.net)
2. Crea una cuenta de hosting
3. Sube archivos via File Manager o FTP
4. Configura tu dominio

#### **000WebHost**
- ✅ PHP 7.4+ gratuito
- ✅ 1GB de espacio
- ✅ SSL gratuito

#### **AwardSpace**
- ✅ PHP 8.0+ gratuito
- ✅ 1GB de espacio
- ✅ Sin anuncios

### 2. Hosting PHP de Pago (Recomendado para producción)

#### **Hostinger** (~$2-4/mes)
- ✅ Rendimiento excelente
- ✅ Soporte 24/7
- ✅ SSL gratuito
- ✅ Backups automáticos

#### **SiteGround** (~$3-6/mes)
- ✅ Optimizado para PHP
- ✅ CDN gratuito
- ✅ Staging environment

#### **DigitalOcean** (~$5/mes)
- ✅ VPS completo
- ✅ Control total
- ✅ Escalabilidad

### 3. Plataformas Cloud

#### **Heroku** (Con buildpack PHP)
```bash
# Crear app
heroku create tu-dashboard-marketing

# Configurar buildpack PHP
heroku buildpacks:set heroku/php

# Deploy
git push heroku main
```

#### **Railway**
- ✅ Deploy automático desde GitHub
- ✅ PHP soportado
- ✅ Plan gratuito disponible

#### **Render**
- ✅ Deploy desde GitHub
- ✅ SSL automático
- ✅ Plan gratuito

## 📋 Instrucciones de Despliegue

### Opción A: Hosting Tradicional (FTP)

1. **Preparar archivos**
   ```bash
   # Comprimir proyecto
   zip -r dashboard-marketing.zip . -x "*.git*" "*.md" "DEPLOYMENT.md"
   ```

2. **Subir via FTP**
   - Usa FileZilla, WinSCP o el File Manager del hosting
   - Sube todos los archivos a la carpeta `public_html` o `www`

3. **Configurar permisos**
   ```bash
   chmod 755 includes/
   chmod 644 includes/*.php
   chmod 755 assets/
   ```

4. **Verificar PHP**
   - Crea un archivo `info.php`:
   ```php
   <?php phpinfo(); ?>
   ```
   - Visita `tu-dominio.com/info.php`
   - Verifica que PHP 7.4+ esté activo
   - **¡Elimina el archivo después!**

### Opción B: Deploy Automático (GitHub + Webhook)

1. **Configurar webhook en hosting**
   ```php
   <?php
   // deploy.php
   if ($_POST['secret'] === 'tu-secreto-seguro') {
       shell_exec('cd /path/to/your/site && git pull origin main');
       echo "Deploy successful!";
   }
   ?>
   ```

2. **Configurar GitHub webhook**
   - Ve a Settings → Webhooks
   - URL: `https://tu-dominio.com/deploy.php`
   - Secret: tu-secreto-seguro
   - Events: Push

### Opción C: Servidor Local (Desarrollo)

#### XAMPP (Windows/Mac/Linux)
```bash
# Descargar XAMPP
# Copiar proyecto a htdocs/
cp -r dashboard-marketing/ /xampp/htdocs/

# Iniciar Apache
# Visitar http://localhost/dashboard-marketing/
```

#### Docker (Multiplataforma)
```dockerfile
# Dockerfile
FROM php:7.4-apache
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80
```

```bash
# Build y run
docker build -t dashboard-marketing .
docker run -p 8080:80 dashboard-marketing
```

## 🔧 Configuración Post-Despliegue

### 1. Verificar Funcionalidad

**Checklist básico:**
- [ ] Página principal carga correctamente
- [ ] Formulario de carga funciona
- [ ] Procesamiento de CSV funciona
- [ ] Gráficos se muestran correctamente
- [ ] Tabla es interactiva
- [ ] Exportación funciona

### 2. Optimización para Producción

#### Configurar PHP
```ini
; php.ini optimizations
memory_limit = 256M
max_execution_time = 60
upload_max_filesize = 10M
post_max_size = 10M
```

#### Habilitar Compresión
```apache
# .htaccess
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

#### Cache Headers
```apache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

### 3. Seguridad

#### SSL/HTTPS
- Configura certificado SSL (Let's Encrypt gratuito)
- Fuerza HTTPS en .htaccess:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Protección de archivos
```apache
# .htaccess
<Files "*.md">
    Order allow,deny
    Deny from all
</Files>
```

## 🔍 Solución de Problemas

### Error: "Internal Server Error"
1. **Verificar logs de error** del servidor
2. **Revisar permisos** de archivos (755 para carpetas, 644 para archivos)
3. **Verificar .htaccess** - renombra temporalmente para probar

### Error: "Function not found"
1. **Verificar versión PHP** (requiere 7.4+)
2. **Verificar extensiones** PHP habilitadas

### Error: "Cannot connect to Google Sheets"
1. **Verificar conectividad** del servidor
2. **Revisar firewall** del hosting
3. **Probar con archivo CSV** local

### Rendimiento lento
1. **Optimizar imágenes** y assets
2. **Habilitar compresión** gzip
3. **Usar CDN** para librerías externas
4. **Implementar cache** PHP

## 📊 Monitoreo

### Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring
- **UptimeRobot**: Monitoreo gratuito
- **Pingdom**: Análisis de rendimiento
- **StatusCake**: Alertas por email

## 🚀 Escalabilidad

### Para alto tráfico:
1. **CDN**: CloudFlare gratuito
2. **Cache**: Redis/Memcached
3. **Load Balancer**: Múltiples servidores
4. **Base de datos**: MySQL para datos persistentes

### Automatización:
1. **CI/CD**: GitHub Actions
2. **Backups**: Automáticos diarios
3. **Updates**: Dependencias automáticas

---

## 📞 Soporte de Despliegue

Si necesitas ayuda con el despliegue:

1. **Crea un issue** en GitHub con detalles del error
2. **Incluye logs** del servidor si están disponibles
3. **Especifica el hosting** que estás usando
4. **Proporciona URL** de prueba si es posible

**¡Tu dashboard estará funcionando en producción en minutos!** 🎉