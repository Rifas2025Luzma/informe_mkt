<?php
/**
 * Marketing Dashboard - Main Entry Point
 * Processes advertising data from Google Sheets and displays interactive dashboard
 * 
 * @author Marketing Dashboard Team
 * @version 1.0
 */

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type
header('Content-Type: text/html; charset=UTF-8');

// Include required files
require_once 'includes/config.php';
require_once 'includes/functions.php';

// Initialize variables
$data = [];
$error = '';
$success = '';

// Process form submission
if ($_POST) {
    if (isset($_POST['sheets_url']) && !empty($_POST['sheets_url'])) {
        $sheets_url = sanitize_input($_POST['sheets_url']);
        
        // Convert Google Sheets URL to CSV export URL
        $csv_url = convert_sheets_to_csv_url($sheets_url);
        
        if ($csv_url) {
            $data = fetch_and_parse_csv($csv_url);
            if (empty($data)) {
                $error = 'No se pudieron obtener datos válidos del Google Sheets. Verifica la URL y que el documento sea público.';
            } else {
                $success = 'Datos cargados exitosamente. Se encontraron ' . count($data) . ' registros.';
            }
        } else {
            $error = 'URL de Google Sheets inválida. Asegúrate de usar una URL válida de Google Sheets.';
        }
    } elseif (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
        $data = parse_uploaded_csv($_FILES['csv_file']);
        if (empty($data)) {
            $error = 'No se pudieron procesar los datos del archivo CSV. Verifica el formato.';
        } else {
            $success = 'Archivo CSV cargado exitosamente. Se encontraron ' . count($data) . ' registros.';
        }
    }
}

// Calculate metrics if data is available
$metrics = [];
if (!empty($data)) {
    $metrics = calculate_metrics($data);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de Marketing Digital</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <h1><i class="fas fa-chart-line"></i> Dashboard de Marketing Digital</h1>
                <p>Análisis completo de campañas publicitarias</p>
            </div>
        </header>

        <!-- Data Input Section -->
        <section class="data-input">
            <div class="card">
                <h2><i class="fas fa-upload"></i> Cargar Datos</h2>
                
                <?php if ($error): ?>
                    <div class="alert alert-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <?php echo htmlspecialchars($error); ?>
                    </div>
                <?php endif; ?>

                <?php if ($success): ?>
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle"></i>
                        <?php echo htmlspecialchars($success); ?>
                    </div>
                <?php endif; ?>

                <form method="POST" enctype="multipart/form-data" class="upload-form">
                    <div class="form-group">
                        <label for="sheets_url">
                            <i class="fab fa-google"></i> URL de Google Sheets
                        </label>
                        <input type="url" 
                               id="sheets_url" 
                               name="sheets_url" 
                               placeholder="https://docs.google.com/spreadsheets/d/..."
                               value="<?php echo isset($_POST['sheets_url']) ? htmlspecialchars($_POST['sheets_url']) : ''; ?>">
                        <small>Asegúrate de que el documento sea público y tenga permisos de lectura</small>
                    </div>

                    <div class="form-divider">
                        <span>O</span>
                    </div>

                    <div class="form-group">
                        <label for="csv_file">
                            <i class="fas fa-file-csv"></i> Subir archivo CSV
                        </label>
                        <input type="file" id="csv_file" name="csv_file" accept=".csv">
                    </div>

                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-sync-alt"></i> Procesar Datos
                    </button>
                </form>
            </div>
        </section>

        <?php if (!empty($data) && !empty($metrics)): ?>
        <!-- Metrics Cards -->
        <section class="metrics">
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Inversión Total</h3>
                        <p class="metric-value">$<?php echo number_format($metrics['total_investment'], 2); ?></p>
                        <small>Meta Ads + Google Ads</small>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Impresiones</h3>
                        <p class="metric-value"><?php echo number_format($metrics['total_impressions']); ?></p>
                        <small>Total de visualizaciones</small>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-mouse-pointer"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Clicks</h3>
                        <p class="metric-value"><?php echo number_format($metrics['total_clicks']); ?></p>
                        <small>CTR: <?php echo number_format($metrics['avg_ctr'], 2); ?>%</small>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <div class="metric-content">
                        <h3>Conversiones</h3>
                        <p class="metric-value"><?php echo number_format($metrics['total_conversions']); ?></p>
                        <small>ROAS: <?php echo number_format($metrics['avg_roas'], 2); ?></small>
                    </div>
                </div>
            </div>
        </section>

        <!-- Charts Section -->
        <section class="charts">
            <div class="charts-grid">
                <div class="chart-card">
                    <h3><i class="fas fa-chart-bar"></i> Inversión por Plataforma</h3>
                    <canvas id="platformChart"></canvas>
                </div>
                <div class="chart-card">
                    <h3><i class="fas fa-chart-line"></i> Rendimiento Temporal</h3>
                    <canvas id="timeChart"></canvas>
                </div>
            </div>
        </section>

        <!-- Data Table -->
        <section class="data-table">
            <div class="card">
                <div class="table-header">
                    <h3><i class="fas fa-table"></i> Detalle de Campañas</h3>
                    <div class="table-controls">
                        <input type="text" id="searchInput" placeholder="Buscar campañas...">
                        <select id="platformFilter">
                            <option value="">Todas las plataformas</option>
                            <option value="Meta Ads">Meta Ads</option>
                            <option value="Google Ads">Google Ads</option>
                        </select>
                        <button id="exportBtn" class="btn btn-secondary">
                            <i class="fas fa-download"></i> Exportar PDF
                        </button>
                    </div>
                </div>
                
                <div class="table-container">
                    <table id="campaignTable">
                        <thead>
                            <tr>
                                <th data-sort="fecha">Fecha <i class="fas fa-sort"></i></th>
                                <th data-sort="plataforma">Plataforma <i class="fas fa-sort"></i></th>
                                <th data-sort="nombre_campana">Campaña <i class="fas fa-sort"></i></th>
                                <th data-sort="inversion">Inversión <i class="fas fa-sort"></i></th>
                                <th data-sort="impresiones">Impresiones <i class="fas fa-sort"></i></th>
                                <th data-sort="clicks">Clicks <i class="fas fa-sort"></i></th>
                                <th data-sort="ctr">CTR <i class="fas fa-sort"></i></th>
                                <th data-sort="conversiones">Conversiones <i class="fas fa-sort"></i></th>
                                <th data-sort="roas">ROAS <i class="fas fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($data as $row): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row['fecha']); ?></td>
                                <td>
                                    <span class="platform-badge <?php echo strtolower(str_replace(' ', '-', $row['plataforma'])); ?>">
                                        <?php echo htmlspecialchars($row['plataforma']); ?>
                                    </span>
                                </td>
                                <td><?php echo htmlspecialchars($row['nombre_campana']); ?></td>
                                <td>$<?php echo number_format($row['inversion'], 2); ?></td>
                                <td><?php echo number_format($row['impresiones']); ?></td>
                                <td><?php echo number_format($row['clicks']); ?></td>
                                <td><?php echo number_format($row['ctr'], 2); ?>%</td>
                                <td><?php echo number_format($row['conversiones']); ?></td>
                                <td><?php echo number_format($row['roas'], 2); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <!-- Footer -->
        <footer class="footer">
            <p>&copy; 2024 Dashboard de Marketing Digital. Desarrollado con PHP y Chart.js</p>
        </footer>
    </div>

    <!-- Loading Overlay -->
    <div id="loadingOverlay" class="loading-overlay">
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Procesando datos...</p>
        </div>
    </div>

    <script src="assets/js/script.js"></script>
    <?php if (!empty($data)): ?>
    <script>
        // Pass PHP data to JavaScript
        const chartData = <?php echo json_encode(prepare_chart_data($data)); ?>;
        initializeCharts(chartData);
    </script>
    <?php endif; ?>
</body>
</html>