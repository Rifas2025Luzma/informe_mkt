# 🚀 Configuración para GitHub Pages

Esta guía te ayudará a publicar tu Dashboard de Marketing Digital en GitHub Pages en menos de 5 minutos.

## ✅ Requisitos Previos

- Cuenta de GitHub (gratuita)
- Navegador web moderno
- Los archivos del dashboard (ya incluidos en este repositorio)

## 🎯 Opción 1: Fork Directo (Más Rápido)

### Paso 1: Fork este repositorio
1. Clic en el botón **"Fork"** en la parte superior derecha
2. Selecciona tu cuenta de GitHub como destino
3. Espera a que se complete el fork

### Paso 2: Habilitar GitHub Pages
1. Ve a tu repositorio forkeado
2. Clic en **"Settings"** (Configuración)
3. Scroll down hasta **"Pages"** en el menú lateral
4. En **"Source"** selecciona **"Deploy from a branch"**
5. Selecciona **"main"** branch y **"/ (root)"**
6. Clic en **"Save"**

### Paso 3: ¡Listo!
- Tu dashboard estará disponible en: `https://tu-usuario.github.io/marketing-dashboard`
- GitHub te mostrará la URL exacta en la sección Pages

## 🎯 Opción 2: Repositorio Nuevo

### Paso 1: Crear repositorio
1. Ve a [GitHub](https://github.com) y clic en **"New repository"**
2. Nombre: `marketing-dashboard` (o el que prefieras)
3. Marca como **"Public"**
4. **NO** inicialices con README (ya tenemos uno)
5. Clic en **"Create repository"**

### Paso 2: Subir archivos
Tienes 3 opciones:

#### Opción A: Drag & Drop (Más fácil)
1. Descarga todos los archivos de este proyecto
2. En tu nuevo repositorio, clic en **"uploading an existing file"**
3. Arrastra todos los archivos a la zona de upload
4. Commit message: "Initial dashboard setup"
5. Clic en **"Commit new files"**

#### Opción B: Git Clone (Para desarrolladores)
```bash
# Clona este repositorio
git clone https://github.com/original-repo/marketing-dashboard.git
cd marketing-dashboard

# Cambia el remote a tu repositorio
git remote set-url origin https://github.com/TU-USUARIO/TU-REPO.git

# Push a tu repositorio
git push -u origin main
```

#### Opción C: GitHub CLI
```bash
gh repo create marketing-dashboard --public
git clone https://github.com/TU-USUARIO/marketing-dashboard.git
# Copia los archivos del dashboard
git add .
git commit -m "Initial dashboard setup"
git push origin main
```

### Paso 3: Habilitar GitHub Pages
1. En tu repositorio, ve a **Settings** → **Pages**
2. Source: **"Deploy from a branch"**
3. Branch: **"main"** / **"/ (root)"**
4. **Save**

## 🔧 Personalización Antes de Publicar

### Cambiar el título y descripción
Edita `index.html`:
```html
<title>Tu Empresa - Dashboard Marketing</title>
<meta name="description" content="Dashboard personalizado de Tu Empresa">
```

### Personalizar colores de marca
Edita `assets/css/style.css`:
```css
:root {
    --primary-color: #TU-COLOR-PRINCIPAL;
    --secondary-color: #TU-COLOR-SECUNDARIO;
}
```

### Agregar tu logo
1. Sube tu logo a la carpeta `assets/images/`
2. Edita el header en `index.html`

## 📊 Configurar Google Sheets

### Paso 1: Crear tu Google Sheets
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Usa la estructura de `sample-data.csv` como referencia

### Paso 2: Hacer público el documento
1. Clic en **"Compartir"** (botón azul)
2. **"Cambiar a cualquier persona con el enlace"**
3. Permisos: **"Lector"**
4. Copia la URL completa

### Paso 3: Probar en tu dashboard
1. Ve a tu GitHub Pages URL
2. Pega la URL de Google Sheets
3. Clic en **"Procesar Datos"**

## 🚀 Verificación de Funcionamiento

### ✅ Checklist de pruebas:
- [ ] La página carga correctamente
- [ ] El botón "Cargar Datos de Demo" funciona
- [ ] Los gráficos se muestran
- [ ] La tabla es interactiva (filtros, ordenamiento)
- [ ] La exportación CSV funciona
- [ ] Es responsive en móvil

### 🐛 Solución de problemas comunes:

#### "404 - Page not found"
- Verifica que GitHub Pages esté habilitado
- Asegúrate de que el archivo se llame `index.html`
- Espera 5-10 minutos para que se propague

#### "Los gráficos no cargan"
- Abre F12 → Console y busca errores
- Verifica que los archivos CSS y JS se carguen correctamente

#### "No se pueden cargar datos de Google Sheets"
- Verifica que el documento sea público
- Prueba la URL en el navegador directamente
- Usa el botón de demo para verificar que el dashboard funciona

## 🔄 Actualizaciones Futuras

### Para actualizar tu dashboard:
1. **Opción A**: Edita archivos directamente en GitHub
2. **Opción B**: Clona, edita localmente y push
3. **Opción C**: Usa GitHub Codespaces para editar online

### Auto-deploy:
GitHub Pages se actualiza automáticamente cada vez que haces push a la rama main.

## 📈 Optimizaciones Adicionales

### Custom Domain (Opcional)
1. Compra un dominio
2. En Settings → Pages → Custom domain
3. Agrega tu dominio: `dashboard.tu-empresa.com`

### Google Analytics (Opcional)
Agrega antes de `</head>` en `index.html`:
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

## 📞 Soporte

### Si algo no funciona:
1. **Revisa la consola** del navegador (F12)
2. **Verifica los archivos** estén todos subidos
3. **Espera 5-10 minutos** para propagación de GitHub Pages
4. **Crea un issue** en GitHub si persiste el problema

### URLs útiles:
- **Tu dashboard**: `https://tu-usuario.github.io/tu-repo`
- **Configuración Pages**: `https://github.com/tu-usuario/tu-repo/settings/pages`
- **Acciones GitHub**: `https://github.com/tu-usuario/tu-repo/actions`

---

## 🎉 ¡Felicidades!

Tu Dashboard de Marketing Digital ya está funcionando en GitHub Pages. 

**Próximos pasos:**
1. Personaliza los colores y textos
2. Configura tu Google Sheets con datos reales
3. Comparte la URL con tu equipo
4. ¡Analiza tus campañas publicitarias!

**URL de tu dashboard:** `https://tu-usuario.github.io/marketing-dashboard`