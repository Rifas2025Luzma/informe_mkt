<?php
/**
 * Core functions for Marketing Dashboard
 * Contains all data processing and utility functions
 */

/**
 * Sanitize input data
 */
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

/**
 * Convert Google Sheets URL to CSV export URL
 */
function convert_sheets_to_csv_url($sheets_url) {
    // Extract sheet ID from various Google Sheets URL formats
    $pattern = '/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/';
    if (preg_match($pattern, $sheets_url, $matches)) {
        $sheet_id = $matches[1];
        return "https://docs.google.com/spreadsheets/d/{$sheet_id}/export?format=csv&gid=0";
    }
    return false;
}

/**
 * Fetch and parse CSV data from URL
 */
function fetch_and_parse_csv($csv_url) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 30,
            'user_agent' => 'Marketing Dashboard Bot 1.0'
        ]
    ]);
    
    $csv_content = @file_get_contents($csv_url, false, $context);
    
    if ($csv_content === false) {
        return [];
    }
    
    return parse_csv_content($csv_content);
}

/**
 * Parse uploaded CSV file
 */
function parse_uploaded_csv($file) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return [];
    }
    
    if ($file['size'] > MAX_FILE_SIZE) {
        return [];
    }
    
    $csv_content = file_get_contents($file['tmp_name']);
    return parse_csv_content($csv_content);
}

/**
 * Parse CSV content into structured data
 */
function parse_csv_content($csv_content) {
    $lines = str_getcsv($csv_content, "\n");
    if (empty($lines)) {
        return [];
    }
    
    // Get headers from first line
    $headers = str_getcsv($lines[0], CSV_DELIMITER, CSV_ENCLOSURE, CSV_ESCAPE);
    $headers = array_map('strtolower', array_map('trim', $headers));
    
    // Normalize header names
    $header_map = [
        'fecha' => 'fecha',
        'date' => 'fecha',
        'plataforma' => 'plataforma',
        'platform' => 'plataforma',
        'nombre_campaña' => 'nombre_campana',
        'nombre_campana' => 'nombre_campana',
        'campaign_name' => 'nombre_campana',
        'tipo_campaña' => 'tipo_campana',
        'tipo_campana' => 'tipo_campana',
        'campaign_type' => 'tipo_campana',
        'inversión' => 'inversion',
        'inversion' => 'inversion',
        'investment' => 'inversion',
        'spend' => 'inversion',
        'impresiones' => 'impresiones',
        'impressions' => 'impresiones',
        'clicks' => 'clicks',
        'conversiones' => 'conversiones',
        'conversions' => 'conversiones',
        'alcance' => 'alcance',
        'reach' => 'alcance',
        'frecuencia' => 'frecuencia',
        'frequency' => 'frecuencia',
        'cpm' => 'cpm',
        'cpc' => 'cpc',
        'ctr' => 'ctr',
        'roas' => 'roas'
    ];
    
    $normalized_headers = [];
    foreach ($headers as $header) {
        $normalized_headers[] = isset($header_map[$header]) ? $header_map[$header] : $header;
    }
    
    $data = [];
    for ($i = 1; $i < count($lines); $i++) {
        $row = str_getcsv($lines[$i], CSV_DELIMITER, CSV_ENCLOSURE, CSV_ESCAPE);
        
        if (count($row) !== count($normalized_headers)) {
            continue; // Skip malformed rows
        }
        
        $record = array_combine($normalized_headers, $row);
        
        // Validate and clean data
        if (validate_record($record)) {
            $data[] = clean_record($record);
        }
    }
    
    return $data;
}

/**
 * Validate a single record
 */
function validate_record($record) {
    // Check if required fields exist and are not empty
    $required_fields = ['fecha', 'plataforma', 'nombre_campana', 'inversion'];
    
    foreach ($required_fields as $field) {
        if (!isset($record[$field]) || empty(trim($record[$field]))) {
            return false;
        }
    }
    
    // Validate date format
    $date = DateTime::createFromFormat('Y-m-d', $record['fecha']);
    if (!$date || $date->format('Y-m-d') !== $record['fecha']) {
        // Try alternative date formats
        $date = DateTime::createFromFormat('d/m/Y', $record['fecha']);
        if (!$date) {
            $date = DateTime::createFromFormat('m/d/Y', $record['fecha']);
            if (!$date) {
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Clean and normalize a single record
 */
function clean_record($record) {
    // Normalize date format
    $date = DateTime::createFromFormat('Y-m-d', $record['fecha']);
    if (!$date) {
        $date = DateTime::createFromFormat('d/m/Y', $record['fecha']);
        if (!$date) {
            $date = DateTime::createFromFormat('m/d/Y', $record['fecha']);
        }
    }
    $record['fecha'] = $date->format('Y-m-d');
    
    // Clean numeric fields
    $numeric_fields = ['inversion', 'impresiones', 'clicks', 'conversiones', 'alcance', 'frecuencia', 'cpm', 'cpc', 'ctr', 'roas'];
    
    foreach ($numeric_fields as $field) {
        if (isset($record[$field])) {
            // Remove currency symbols and commas
            $value = preg_replace('/[^\d.-]/', '', $record[$field]);
            $record[$field] = is_numeric($value) ? (float)$value : 0;
        } else {
            $record[$field] = 0;
        }
    }
    
    // Calculate CTR if not provided
    if ($record['ctr'] == 0 && $record['clicks'] > 0 && $record['impresiones'] > 0) {
        $record['ctr'] = ($record['clicks'] / $record['impresiones']) * 100;
    }
    
    // Calculate CPC if not provided
    if ($record['cpc'] == 0 && $record['clicks'] > 0 && $record['inversion'] > 0) {
        $record['cpc'] = $record['inversion'] / $record['clicks'];
    }
    
    // Calculate CPM if not provided
    if ($record['cpm'] == 0 && $record['impresiones'] > 0 && $record['inversion'] > 0) {
        $record['cpm'] = ($record['inversion'] / $record['impresiones']) * 1000;
    }
    
    return $record;
}

/**
 * Calculate overall metrics from data
 */
function calculate_metrics($data) {
    $metrics = [
        'total_investment' => 0,
        'total_impressions' => 0,
        'total_clicks' => 0,
        'total_conversions' => 0,
        'avg_ctr' => 0,
        'avg_cpc' => 0,
        'avg_cpm' => 0,
        'avg_roas' => 0,
        'platform_breakdown' => []
    ];
    
    $platform_data = [];
    
    foreach ($data as $row) {
        $metrics['total_investment'] += $row['inversion'];
        $metrics['total_impressions'] += $row['impresiones'];
        $metrics['total_clicks'] += $row['clicks'];
        $metrics['total_conversions'] += $row['conversiones'];
        
        // Platform breakdown
        $platform = $row['plataforma'];
        if (!isset($platform_data[$platform])) {
            $platform_data[$platform] = [
                'investment' => 0,
                'impressions' => 0,
                'clicks' => 0,
                'conversions' => 0
            ];
        }
        
        $platform_data[$platform]['investment'] += $row['inversion'];
        $platform_data[$platform]['impressions'] += $row['impresiones'];
        $platform_data[$platform]['clicks'] += $row['clicks'];
        $platform_data[$platform]['conversions'] += $row['conversiones'];
    }
    
    // Calculate averages
    if ($metrics['total_impressions'] > 0) {
        $metrics['avg_ctr'] = ($metrics['total_clicks'] / $metrics['total_impressions']) * 100;
        $metrics['avg_cpm'] = ($metrics['total_investment'] / $metrics['total_impressions']) * 1000;
    }
    
    if ($metrics['total_clicks'] > 0) {
        $metrics['avg_cpc'] = $metrics['total_investment'] / $metrics['total_clicks'];
    }
    
    if ($metrics['total_investment'] > 0) {
        // Calculate ROAS (assuming conversion value, you might want to add this to your data)
        $total_revenue = $metrics['total_conversions'] * 50; // Assuming $50 per conversion
        $metrics['avg_roas'] = $total_revenue / $metrics['total_investment'];
    }
    
    $metrics['platform_breakdown'] = $platform_data;
    
    return $metrics;
}

/**
 * Prepare data for charts
 */
function prepare_chart_data($data) {
    $chart_data = [
        'platform_investment' => [],
        'daily_performance' => []
    ];
    
    // Platform investment data
    $platform_totals = [];
    foreach ($data as $row) {
        $platform = $row['plataforma'];
        if (!isset($platform_totals[$platform])) {
            $platform_totals[$platform] = 0;
        }
        $platform_totals[$platform] += $row['inversion'];
    }
    
    $chart_data['platform_investment'] = [
        'labels' => array_keys($platform_totals),
        'data' => array_values($platform_totals)
    ];
    
    // Daily performance data
    $daily_data = [];
    foreach ($data as $row) {
        $date = $row['fecha'];
        if (!isset($daily_data[$date])) {
            $daily_data[$date] = [
                'investment' => 0,
                'conversions' => 0
            ];
        }
        $daily_data[$date]['investment'] += $row['inversion'];
        $daily_data[$date]['conversions'] += $row['conversiones'];
    }
    
    ksort($daily_data); // Sort by date
    
    $chart_data['daily_performance'] = [
        'labels' => array_keys($daily_data),
        'investment' => array_column($daily_data, 'investment'),
        'conversions' => array_column($daily_data, 'conversions')
    ];
    
    return $chart_data;
}
?>