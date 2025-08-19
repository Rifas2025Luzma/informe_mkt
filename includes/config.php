<?php
/**
 * Configuration file for Marketing Dashboard
 * Contains all configuration constants and settings
 */

// Application settings
define('APP_NAME', 'Marketing Dashboard');
define('APP_VERSION', '1.0.0');

// File upload settings
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_FILE_TYPES', ['csv']);

// CSV parsing settings
define('CSV_DELIMITER', ',');
define('CSV_ENCLOSURE', '"');
define('CSV_ESCAPE', '\\');

// Required CSV columns
define('REQUIRED_COLUMNS', [
    'fecha',
    'plataforma',
    'nombre_campana',
    'tipo_campana',
    'inversion',
    'impresiones',
    'clicks',
    'conversiones',
    'alcance',
    'frecuencia',
    'cpm',
    'cpc',
    'ctr',
    'roas'
]);

// Date format
define('DATE_FORMAT', 'Y-m-d');

// Timezone
date_default_timezone_set('America/Mexico_City');
?>