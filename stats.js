// JavaScript-код для отображения статистики продаж на странице stats.html
document.addEventListener('DOMContentLoaded', function () {
    fetch('/stats')
    .then(response => response.json())
    .then(data => {
        displaySalesChart(data.salesData);
        displaySalesData(data.salesData);
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
});

// Функция для отображения графика статистики продаж
function displaySalesChart(salesData) {
    const ctx = document.getElementById('sales-chart-canvas').getContext('2d');
    const products = Object.keys(salesData);
    const salesCount = Object.values(salesData);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products,
            datasets: [{
                label: 'Количество продаж',
                data: salesCount,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Функция для отображения данных статистики продаж в виде таблицы
function displaySalesData(salesData) {
    const salesTable = document.getElementById('sales-data-table');
    const tbody = salesTable.querySelector('tbody');
    
    for (const product in salesData) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product}</td>
            <td>${salesData[product]}</td>
        `;
        tbody.appendChild(tr);
    }
}
