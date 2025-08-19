/**
 * Marketing Dashboard JavaScript
 * Handles interactive functionality, charts, and data manipulation
 */

// Global variables
let currentData = [];
let currentSort = { column: null, direction: 'asc' };

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeTable();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Form submission
    const form = document.querySelector('.upload-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
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
 * Handle form submission with loading state
 */
function handleFormSubmission(event) {
    showLoading();
    
    // Add a small delay to show loading animation
    setTimeout(() => {
        // Form will submit normally, this just shows the loading state
    }, 100);
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
 * Initialize table functionality
 */
function initializeTable() {
    const table = document.getElementById('campaignTable');
    if (table) {
        const tbody = table.querySelector('tbody');
        if (tbody) {
            currentData = Array.from(tbody.querySelectorAll('tr')).map(row => {
                const cells = row.querySelectorAll('td');
                return {
                    element: row,
                    data: {
                        fecha: cells[0]?.textContent.trim() || '',
                        plataforma: cells[1]?.textContent.trim() || '',
                        nombre_campana: cells[2]?.textContent.trim() || '',
                        inversion: parseFloat(cells[3]?.textContent.replace(/[$,]/g, '') || '0'),
                        impresiones: parseInt(cells[4]?.textContent.replace(/,/g, '') || '0'),
                        clicks: parseInt(cells[5]?.textContent.replace(/,/g, '') || '0'),
                        ctr: parseFloat(cells[6]?.textContent.replace('%', '') || '0'),
                        conversiones: parseInt(cells[7]?.textContent.replace(/,/g, '') || '0'),
                        roas: parseFloat(cells[8]?.textContent || '0')
                    }
                };
            });
        }
    }
    
    // Add animation to metric cards
    animateMetricCards();
}

/**
 * Handle search functionality
 */
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tbody = document.querySelector('#campaignTable tbody');
    
    if (!tbody) return;
    
    currentData.forEach(item => {
        const matchesSearch = 
            item.data.nombre_campana.toLowerCase().includes(searchTerm) ||
            item.data.plataforma.toLowerCase().includes(searchTerm) ||
            item.data.fecha.includes(searchTerm);
        
        item.element.style.display = matchesSearch ? '' : 'none';
    });
    
    updateTableStats();
}

/**
 * Handle platform filter
 */
function handlePlatformFilter(event) {
    const selectedPlatform = event.target.value;
    const tbody = document.querySelector('#campaignTable tbody');
    
    if (!tbody) return;
    
    currentData.forEach(item => {
        const matchesFilter = !selectedPlatform || 
            item.data.plataforma.toLowerCase().includes(selectedPlatform.toLowerCase());
        
        // Also check if it matches current search
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const matchesSearch = !searchTerm ||
            item.data.nombre_campana.toLowerCase().includes(searchTerm) ||
            item.data.plataforma.toLowerCase().includes(searchTerm) ||
            item.data.fecha.includes(searchTerm);
        
        item.element.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
    
    updateTableStats();
}

/**
 * Handle table sorting
 */
function handleSort(column) {
    const tbody = document.querySelector('#campaignTable tbody');
    if (!tbody) return;
    
    // Update sort direction
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    
    // Sort data
    currentData.sort((a, b) => {
        let valueA = a.data[column];
        let valueB = b.data[column];
        
        // Handle different data types
        if (typeof valueA === 'string') {
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
    
    // Re-append rows in sorted order
    currentData.forEach(item => {
        tbody.appendChild(item.element);
    });
    
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
 * Update table statistics
 */
function updateTableStats() {
    const visibleRows = currentData.filter(item => 
        item.element.style.display !== 'none'
    ).length;
    
    // You can add a stats display here if needed
    console.log(`Showing ${visibleRows} of ${currentData.length} campaigns`);
}

/**
 * Handle export functionality
 */
function handleExport() {
    // Simple CSV export
    const headers = ['Fecha', 'Plataforma', 'Campaña', 'Inversión', 'Impresiones', 'Clicks', 'CTR', 'Conversiones', 'ROAS'];
    const csvContent = [
        headers.join(','),
        ...currentData
            .filter(item => item.element.style.display !== 'none')
            .map(item => [
                item.data.fecha,
                `"${item.data.plataforma}"`,
                `"${item.data.nombre_campana}"`,
                item.data.inversion,
                item.data.impresiones,
                item.data.clicks,
                item.data.ctr,
                item.data.conversiones,
                item.data.roas
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
}

/**
 * Animate metric cards on load
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
 * Initialize charts with provided data
 */
function initializeCharts(chartData) {
    hideLoading();
    
    // Platform Investment Chart
    const platformCtx = document.getElementById('platformChart');
    if (platformCtx && chartData.platform_investment) {
        new Chart(platformCtx, {
            type: 'doughnut',
            data: {
                labels: chartData.platform_investment.labels,
                datasets: [{
                    data: chartData.platform_investment.data,
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
                                return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Time Performance Chart
    const timeCtx = document.getElementById('timeChart');
    if (timeCtx && chartData.daily_performance) {
        new Chart(timeCtx, {
            type: 'line',
            data: {
                labels: chartData.daily_performance.labels,
                datasets: [
                    {
                        label: 'Inversión ($)',
                        data: chartData.daily_performance.investment,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Conversiones',
                        data: chartData.daily_performance.conversions,
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
                                return '$' + value.toLocaleString();
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
                                    return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
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
    
    // Add chart animations
    setTimeout(() => {
        const chartCards = document.querySelectorAll('.chart-card');
        chartCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-up');
            }, index * 200);
        });
    }, 500);
}

/**
 * Utility function to format numbers
 */
function formatNumber(num, decimals = 0) {
    return new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Utility function to format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Debounce function for search
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

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.removeEventListener('input', handleSearch);
    searchInput.addEventListener('input', debouncedSearch);
}