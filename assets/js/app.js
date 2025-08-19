/**
 * Marketing Dashboard JavaScript Application
 * Static version for GitHub Pages
 */

// Global variables
let currentData = [];
let currentSort = { column: null, direction: 'asc' };
let platformChart = null;
let timeChart = null;

// Demo data for testing
const DEMO_DATA = [
    {
        fecha: '2024-01-01',
        plataforma: 'Meta Ads',
        nombre_campana: 'Campaña Navidad 2024',
        tipo_campana: 'Conversiones',
        inversion: 1500.00,
        impresiones: 45000,
        clicks: 1200,
        conversiones: 85,
        alcance: 35000,
        frecuencia: 1.3,
        cpm: 33.33,
        cpc: 1.25,
        ctr: 2.67,
        roas: 4.25
    },
    {
        fecha: '2024-01-01',
        plataforma: 'Google Ads',
        nombre_campana: 'Black Friday Ofertas',
        tipo_campana: 'Shopping',
        inversion: 2200.00,
        impresiones: 67000,
        clicks: 1800,
        conversiones: 120,
        alcance: 55000,
        frecuencia: 1.2,
        cpm: 32.84,
        cpc: 1.22,
        ctr: 2.69,
        roas: 3.85
    },
    {
        fecha: '2024-01-02',
        plataforma: 'Meta Ads',
        nombre_campana: 'Retargeting Enero',
        tipo_campana: 'Retargeting',
        inversion: 800.00,
        impresiones: 25000,
        clicks: 750,
        conversiones: 45,
        alcance: 20000,
        frecuencia: 1.25,
        cpm: 32.00,
        cpc: 1.07,
        ctr: 3.00,
        roas: 3.50
    },
    {
        fecha: '2024-01-02',
        plataforma: 'Google Ads',
        nombre_campana: 'Búsqueda Productos',
        tipo_campana: 'Search',
        inversion: 1200.00,
        impresiones: 35000,
        clicks: 980,
        conversiones: 65,
        alcance: 28000,
        frecuencia: 1.25,
        cpm: 34.29,
        cpc: 1.22,
        ctr: 2.80,
        roas: 3.25
    },
    {
        fecha: '2024-01-03',
        plataforma: 'Meta Ads',
        nombre_campana: 'Prospección Nuevos',
        tipo_campana: 'Prospección',
        inversion: 1800.00,
        impresiones: 55000,
        clicks: 1400,
        conversiones: 95,
        alcance: 45000,
        frecuencia: 1.22,
        cpm: 32.73,
        cpc: 1.29,
        ctr: 2.55,
        roas: 4.10
    },
    {
        fecha: '2024-01-03',
        plataforma: 'Google Ads',
        nombre_campana: 'Display Network',
        tipo_campana: 'Display',
        inversion: 900.00,
        impresiones: 78000,
        clicks: 890,
        conversiones: 35,
        alcance: 65000,
        frecuencia: 1.20,
        cpm: 11.54,
        cpc: 1.01,
        ctr: 1.14,
        roas: 2.80
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Form submission
    const form = document.getElementById('uploadForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }

    // File input change
    const fileInput = document.getElementById('csv_file');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelection);
    }

    // Demo data button
    const demoBtn = document.getElementById('loadDemoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', loadDemoData);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Platform filter
    const platformFilter = document.getElementById('platformFilter');
    if (platformFilter) {
        platformFilter.addEventListener('change', handlePlatformFilter);
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }

    // Table sorting
    const sortableHeaders = document.querySelectorAll('th[data-sort]');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => handleSort(header.dataset.sort));
    });
}

/**
 * Handle form submission
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    const sheetsUrl = document.getElementById('sheets_url').value.trim();
    const fileInput = document.getElementById('csv_file');
    
    if (sheetsUrl) {
        loadFromGoogleSheets(sheetsUrl);
    } else if (fileInput.files.length > 0) {
        loadFromCSVFile(fileInput.files[0]);
    } else {
        showAlert('Por favor, proporciona una URL de Google Sheets o selecciona un archivo CSV.', 'error');
    }
}

/**
 * Handle file selection
 */
function handleFileSelection(event) {
    const file = event.target.files[0];
    if (file) {
        // Clear the sheets URL when a file is selected
        document.getElementById('sheets_url').value = '';
    }
}

/**
 * Load demo data
 */
function loadDemoData() {
    showLoading();
    
    setTimeout(() => {
        currentData = [...DEMO_DATA];
        processData(currentData);
        showAlert('Datos de demo cargados exitosamente. Se encontraron ' + currentData.length + ' registros.', 'success');
        hideLoading();
    }, 1000);
}

/**
 * Load data from Google Sheets
 */
function loadFromGoogleSheets(sheetsUrl) {
    showLoading();
    
    // Convert Google Sheets URL to CSV export URL
    const csvUrl = convertSheetsToCsvUrl(sheetsUrl);
    
    if (!csvUrl) {
        showAlert('URL de Google Sheets inválida. Asegúrate de usar una URL válida de Google Sheets.', 'error');
        hideLoading();
        return;
    }
    
    // Use CORS proxy for cross-origin requests
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(csvUrl);
    
    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo acceder al documento. Verifica que sea público.');
            }
            return response.text();
        })
        .then(csvText => {
            parseCSVData(csvText);
        })
        .catch(error => {
            console.error('Error loading Google Sheets:', error);
            showAlert('No se pudieron obtener datos del Google Sheets. Verifica la URL y que el documento sea público.', 'error');
            hideLoading();
        });
}

/**
 * Load data from CSV file
 */
function loadFromCSVFile(file) {
    showLoading();
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showAlert('El archivo es demasiado grande. El límite es 5MB.', 'error');
        hideLoading();
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        parseCSVData(e.target.result);
    };
    reader.onerror = function() {
        showAlert('Error al leer el archivo CSV.', 'error');
        hideLoading();
    };
    reader.readAsText(file);
}

/**
 * Parse CSV data using PapaParse
 */
function parseCSVData(csvText) {
    Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: function(header) {
            // Normalize header names
            const headerMap = {
                'fecha': 'fecha',
                'date': 'fecha',
                'plataforma': 'plataforma',
                'platform': 'plataforma',
                'nombre_campaña': 'nombre_campana',
                'nombre_campana': 'nombre_campana',
                'campaign_name': 'nombre_campana',
                'tipo_campaña': 'tipo_campana',
                'tipo_campana': 'tipo_campana',
                'campaign_type': 'tipo_campana',
                'inversión': 'inversion',
                'inversion': 'inversion',
                'investment': 'inversion',
                'spend': 'inversion',
                'impresiones': 'impresiones',
                'impressions': 'impresiones',
                'clicks': 'clicks',
                'conversiones': 'conversiones',
                'conversions': 'conversiones',
                'alcance': 'alcance',
                'reach': 'alcance',
                'frecuencia': 'frecuencia',
                'frequency': 'frecuencia',
                'cpm': 'cpm',
                'cpc': 'cpc',
                'ctr': 'ctr',
                'roas': 'roas'
            };
            
            const normalizedHeader = header.toLowerCase().trim();
            return headerMap[normalizedHeader] || normalizedHeader;
        },
        complete: function(results) {
            if (results.errors.length > 0) {
                console.warn('CSV parsing warnings:', results.errors);
            }
            
            const validData = results.data
                .filter(row => validateRecord(row))
                .map(row => cleanRecord(row));
            
            if (validData.length === 0) {
                showAlert('No se encontraron datos válidos en el archivo CSV. Verifica el formato.', 'error');
                hideLoading();
                return;
            }
            
            currentData = validData;
            processData(currentData);
            showAlert('Datos cargados exitosamente. Se encontraron ' + currentData.length + ' registros.', 'success');
            hideLoading();
        },
        error: function(error) {
            console.error('CSV parsing error:', error);
            showAlert('Error al procesar el archivo CSV. Verifica el formato.', 'error');
            hideLoading();
        }
    });
}

/**
 * Convert Google Sheets URL to CSV export URL
 */
function convertSheetsToCsvUrl(sheetsUrl) {
    const pattern = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const match = sheetsUrl.match(pattern);
    
    if (match) {
        const sheetId = match[1];
        return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
    }
    
    return null;
}

/**
 * Validate a single record
 */
function validateRecord(record) {
    const requiredFields = ['fecha', 'plataforma', 'nombre_campana', 'inversion'];
    
    for (const field of requiredFields) {
        if (!record[field] || record[field].toString().trim() === '') {
            return false;
        }
    }
    
    // Validate date format
    const dateStr = record.fecha.toString().trim();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return false;
    }
    
    return true;
}

/**
 * Clean and normalize a single record
 */
function cleanRecord(record) {
    const cleaned = { ...record };
    
    // Normalize date format
    const dateStr = cleaned.fecha.toString().trim();
    const date = new Date(dateStr);
    cleaned.fecha = date.toISOString().split('T')[0];
    
    // Clean numeric fields
    const numericFields = ['inversion', 'impresiones', 'clicks', 'conversiones', 'alcance', 'frecuencia', 'cpm', 'cpc', 'ctr', 'roas'];
    
    numericFields.forEach(field => {
        if (cleaned[field]) {
            // Remove currency symbols and commas
            const value = cleaned[field].toString().replace(/[^\d.-]/g, '');
            cleaned[field] = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        } else {
            cleaned[field] = 0;
        }
    });
    
    // Calculate CTR if not provided
    if (cleaned.ctr === 0 && cleaned.clicks > 0 && cleaned.impresiones > 0) {
        cleaned.ctr = (cleaned.clicks / cleaned.impresiones) * 100;
    }
    
    // Calculate CPC if not provided
    if (cleaned.cpc === 0 && cleaned.clicks > 0 && cleaned.inversion > 0) {
        cleaned.cpc = cleaned.inversion / cleaned.clicks;
    }
    
    // Calculate CPM if not provided
    if (cleaned.cpm === 0 && cleaned.impresiones > 0 && cleaned.inversion > 0) {
        cleaned.cpm = (cleaned.inversion / cleaned.impresiones) * 1000;
    }
    
    return cleaned;
}

/**
 * Process data and update dashboard
 */
function processData(data) {
    updateMetrics(data);
    updateCharts(data);
    updateTable(data);
    showDashboard();
}

/**
 * Calculate and update metrics
 */
function updateMetrics(data) {
    const metrics = {
        totalInvestment: 0,
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        avgCtr: 0,
        avgRoas: 0
    };
    
    data.forEach(row => {
        metrics.totalInvestment += row.inversion;
        metrics.totalImpressions += row.impresiones;
        metrics.totalClicks += row.clicks;
        metrics.totalConversions += row.conversiones;
    });
    
    // Calculate averages
    if (metrics.totalImpressions > 0) {
        metrics.avgCtr = (metrics.totalClicks / metrics.totalImpressions) * 100;
    }
    
    if (metrics.totalInvestment > 0) {
        // Assuming $50 per conversion for ROAS calculation
        const totalRevenue = metrics.totalConversions * 50;
        metrics.avgRoas = totalRevenue / metrics.totalInvestment;
    }
    
    // Update UI
    document.getElementById('totalInvestment').textContent = formatCurrency(metrics.totalInvestment);
    document.getElementById('totalImpressions').textContent = formatNumber(metrics.totalImpressions);
    document.getElementById('totalClicks').textContent = formatNumber(metrics.totalClicks);
    document.getElementById('avgCtr').textContent = `CTR: ${metrics.avgCtr.toFixed(2)}%`;
    document.getElementById('totalConversions').textContent = formatNumber(metrics.totalConversions);
    document.getElementById('avgRoas').textContent = `ROAS: ${metrics.avgRoas.toFixed(2)}`;
    
    // Add animation
    animateMetricCards();
}

/**
 * Update charts
 */
function updateCharts(data) {
    updatePlatformChart(data);
    updateTimeChart(data);
}

/**
 * Update platform investment chart
 */
function updatePlatformChart(data) {
    const platformData = {};
    
    data.forEach(row => {
        const platform = row.plataforma;
        if (!platformData[platform]) {
            platformData[platform] = 0;
        }
        platformData[platform] += row.inversion;
    });
    
    const ctx = document.getElementById('platformChart');
    if (ctx) {
        if (platformChart) {
            platformChart.destroy();
        }
        
        platformChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(platformData),
                datasets: [{
                    data: Object.values(platformData),
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * Update time performance chart
 */
function updateTimeChart(data) {
    const dailyData = {};
    
    data.forEach(row => {
        const date = row.fecha;
        if (!dailyData[date]) {
            dailyData[date] = {
                investment: 0,
                conversions: 0
            };
        }
        dailyData[date].investment += row.inversion;
        dailyData[date].conversions += row.conversiones;
    });
    
    const sortedDates = Object.keys(dailyData).sort();
    
    const ctx = document.getElementById('timeChart');
    if (ctx) {
        if (timeChart) {
            timeChart.destroy();
        }
        
        timeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedDates,
                datasets: [
                    {
                        label: 'Inversión ($)',
                        data: sortedDates.map(date => dailyData[date].investment),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Conversiones',
                        data: sortedDates.map(date => dailyData[date].conversions),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Fecha'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Inversión ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Conversiones'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.datasetIndex === 0) {
                                    return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                                } else {
                                    return `${context.dataset.label}: ${context.parsed.y}`;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * Update data table
 */
function updateTable(data) {
    const tbody = document.getElementById('campaignTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.fecha}</td>
            <td>
                <span class="platform-badge ${row.plataforma.toLowerCase().replace(' ', '-')}">
                    ${row.plataforma}
                </span>
            </td>
            <td>${row.nombre_campana}</td>
            <td>${formatCurrency(row.inversion)}</td>
            <td>${formatNumber(row.impresiones)}</td>
            <td>${formatNumber(row.clicks)}</td>
            <td>${row.ctr.toFixed(2)}%</td>
            <td>${formatNumber(row.conversiones)}</td>
            <td>${row.roas.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Handle search functionality
 */
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tbody = document.getElementById('campaignTableBody');
    
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

/**
 * Handle platform filter
 */
function handlePlatformFilter(event) {
    const selectedPlatform = event.target.value;
    const tbody = document.getElementById('campaignTableBody');
    
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const platformCell = row.querySelector('.platform-badge');
        if (!platformCell) return;
        
        const platformText = platformCell.textContent.trim();
        const matches = !selectedPlatform || platformText.includes(selectedPlatform);
        
        // Also check search filter
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const matchesSearch = !searchTerm || row.textContent.toLowerCase().includes(searchTerm);
        
        row.style.display = (matches && matchesSearch) ? '' : 'none';
    });
}

/**
 * Handle table sorting
 */
function handleSort(column) {
    const tbody = document.getElementById('campaignTableBody');
    if (!tbody) return;
    
    // Update sort direction
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    
    // Get column index
    const columnMap = {
        'fecha': 0,
        'plataforma': 1,
        'nombre_campana': 2,
        'inversion': 3,
        'impresiones': 4,
        'clicks': 5,
        'ctr': 6,
        'conversiones': 7,
        'roas': 8
    };
    
    const columnIndex = columnMap[column];
    if (columnIndex === undefined) return;
    
    // Sort rows
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        let valueA = a.cells[columnIndex].textContent.trim();
        let valueB = b.cells[columnIndex].textContent.trim();
        
        // Handle platform badges
        if (column === 'plataforma') {
            valueA = a.querySelector('.platform-badge').textContent.trim();
            valueB = b.querySelector('.platform-badge').textContent.trim();
        }
        
        // Handle numeric values
        if (['inversion', 'impresiones', 'clicks', 'ctr', 'conversiones', 'roas'].includes(column)) {
            valueA = parseFloat(valueA.replace(/[^\d.-]/g, '')) || 0;
            valueB = parseFloat(valueB.replace(/[^\d.-]/g, '')) || 0;
        } else {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
        
        let comparison = 0;
        if (valueA > valueB) {
            comparison = 1;
        } else if (valueA < valueB) {
            comparison = -1;
        }
        
        return currentSort.direction === 'asc' ? comparison : -comparison;
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicators
    updateSortIndicators();
}

/**
 * Update sort indicators in table headers
 */
function updateSortIndicators() {
    const headers = document.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
        const icon = header.querySelector('i');
        if (header.dataset.sort === currentSort.column) {
            icon.className = currentSort.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        } else {
            icon.className = 'fas fa-sort';
        }
    });
}

/**
 * Handle export functionality
 */
function handleExport() {
    if (currentData.length === 0) {
        showAlert('No hay datos para exportar.', 'error');
        return;
    }
    
    const headers = ['Fecha', 'Plataforma', 'Campaña', 'Tipo', 'Inversión', 'Impresiones', 'Clicks', 'CTR', 'Conversiones', 'ROAS'];
    const csvContent = [
        headers.join(','),
        ...currentData.map(row => [
            row.fecha,
            `"${row.plataforma}"`,
            `"${row.nombre_campana}"`,
            `"${row.tipo_campana}"`,
            row.inversion,
            row.impresiones,
            row.clicks,
            row.ctr,
            row.conversiones,
            row.roas
        ].join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `marketing-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert('Datos exportados exitosamente.', 'success');
}

/**
 * Show dashboard content
 */
function showDashboard() {
    const dashboardContent = document.getElementById('dashboardContent');
    if (dashboardContent) {
        dashboardContent.style.display = 'block';
        dashboardContent.classList.add('fade-in');
    }
}

/**
 * Show loading overlay
 */
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-triangle' : 
                 'fa-info-circle';
    
    alert.innerHTML = `
        <i class="fas ${icon}"></i>
        ${message}
    `;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

/**
 * Animate metric cards
 */
function animateMetricCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

/**
 * Format number with commas
 */
function formatNumber(num, decimals = 0) {
    return new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}