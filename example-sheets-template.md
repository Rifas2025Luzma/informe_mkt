# Plantilla de Google Sheets para Dashboard de Marketing

## 📋 Estructura Requerida

Para que el dashboard funcione correctamente, tu Google Sheets debe tener exactamente estas columnas en este orden:

### Columnas Obligatorias

| # | Nombre Columna | Tipo | Formato | Ejemplo |
|---|----------------|------|---------|---------|
| A | fecha | Fecha | YYYY-MM-DD | 2024-01-15 |
| B | plataforma | Texto | - | Meta Ads |
| C | nombre_campana | Texto | - | Campaña Navidad 2024 |
| D | tipo_campana | Texto | - | Conversiones |
| E | inversion | Número | 0.00 | 1500.00 |
| F | impresiones | Número | 0 | 45000 |
| G | clicks | Número | 0 | 1200 |
| H | conversiones | Número | 0 | 85 |
| I | alcance | Número | 0 | 35000 |
| J | frecuencia | Número | 0.00 | 1.30 |
| K | cpm | Número | 0.00 | 33.33 |
| L | cpc | Número | 0.00 | 1.25 |
| M | ctr | Número | 0.00 | 2.67 |
| N | roas | Número | 0.00 | 4.25 |

## 🔗 Crear Google Sheets

### Paso 1: Crear el documento
1. Ve a [Google Sheets](https://sheets.google.com)
2. Clic en "Crear" → "Hoja de cálculo en blanco"
3. Nombra tu documento: "Dashboard Marketing - [Tu Empresa]"

### Paso 2: Configurar encabezados
Copia y pega estos encabezados en la fila 1:

```
fecha	plataforma	nombre_campana	tipo_campana	inversion	impresiones	clicks	conversiones	alcance	frecuencia	cpm	cpc	ctr	roas
```

### Paso 3: Agregar datos de ejemplo
Puedes usar estos datos de ejemplo para probar:

```
2024-01-01	Meta Ads	Campaña Navidad 2024	Conversiones	1500.00	45000	1200	85	35000	1.3	33.33	1.25	2.67	4.25
2024-01-01	Google Ads	Black Friday Ofertas	Shopping	2200.00	67000	1800	120	55000	1.2	32.84	1.22	2.69	3.85
2024-01-02	Meta Ads	Retargeting Enero	Retargeting	800.00	25000	750	45	20000	1.25	32.00	1.07	3.00	3.50
```

### Paso 4: Hacer público el documento
1. Clic en "Compartir" (botón azul en la esquina superior derecha)
2. En "Obtener enlace" → Clic en "Cambiar a cualquier persona con el enlace"
3. Asegúrate de que esté en "Lector"
4. Copia el enlace generado

## 📊 Valores Recomendados

### Plataforma
- `Meta Ads` (para Facebook e Instagram)
- `Google Ads` (para Google y YouTube)
- `TikTok Ads`
- `LinkedIn Ads`
- `Twitter Ads`

### Tipo de Campaña
- `Conversiones`
- `Tráfico`
- `Reconocimiento`
- `Interacciones`
- `Generación de clientes potenciales`
- `Ventas de catálogo`
- `Alcance`

### Formato de Fecha
- **Correcto**: `2024-01-15`
- **Incorrecto**: `15/01/2024`, `Jan 15, 2024`

### Números
- **Inversión**: Sin símbolos de moneda → `1500.00` (no `$1,500.00`)
- **Impresiones**: Sin comas → `45000` (no `45,000`)
- **Porcentajes**: Como decimal → `2.67` (no `2.67%`)

## ⚠️ Errores Comunes

### ❌ Errores que evitar:
1. **Encabezados incorrectos**: Los nombres deben ser exactos
2. **Fechas mal formateadas**: Usar siempre YYYY-MM-DD
3. **Números con formato**: No usar comas, símbolos de moneda o %
4. **Celdas vacías**: Usar 0 en lugar de dejar vacío
5. **Documento privado**: Debe ser público con permisos de lectura

### ✅ Buenas prácticas:
1. **Consistencia**: Mantén el mismo formato en todas las filas
2. **Actualización regular**: Actualiza los datos periódicamente
3. **Backup**: Mantén una copia de seguridad de tus datos
4. **Validación**: Revisa que los cálculos sean correctos

## 🔄 Automatización (Opcional)

### Google Apps Script
Puedes automatizar la actualización de datos usando Google Apps Script:

```javascript
function updateDashboardData() {
  // Conectar con APIs de Meta y Google
  // Actualizar datos automáticamente
  // Programar ejecución diaria
}
```

### Zapier/Make
- Conecta tus plataformas publicitarias
- Automatiza la transferencia de datos
- Programa actualizaciones regulares

## 📞 Soporte

Si tienes problemas con la configuración:

1. **Verifica la estructura**: Asegúrate de que las columnas coincidan exactamente
2. **Revisa permisos**: El documento debe ser público
3. **Valida datos**: Usa el archivo CSV de ejemplo para probar
4. **Contacta soporte**: Crea un issue en GitHub si persisten los problemas

---

**¡Listo! Tu Google Sheets está configurado para funcionar perfectamente con el Dashboard de Marketing Digital.**