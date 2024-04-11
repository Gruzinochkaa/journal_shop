document.addEventListener('DOMContentLoaded', async function() {
    const salesChartCanvas = document.getElementById('sales-chart-canvas');
    const salesDataTable = document.getElementById('sales-data-table');
  
    try {
      // Запрос к серверу для получения статистики продаж
      const response = await fetch('/sales-statistics');
      const salesData = await response.json();
  
      // Создание и отображение графика статистики продаж
      const salesChartLabels = salesData.map(item => item.name_journal);
      const salesChartData = salesData.map(item => item.количество_продаж);
  
      const colors = [
        'rgba(255, 99, 132, 0.5)',  // Красный с прозрачностью
        'rgba(54, 162, 235, 0.5)',  // Синий с прозрачностью
        'rgba(255, 206, 86, 0.5)',  // Желтый с прозрачностью
        'rgba(75, 192, 192, 0.5)'   // Зеленый с прозрачностью
    ];

new Chart(salesChartCanvas, {
    type: 'bar',
    data: {
        labels: salesChartLabels,
        datasets: [{
            label: 'Количество продаж',
            data: salesChartData,
            backgroundColor: colors, // Массив цветов для каждого элемента данных
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false, // Отключить пропорциональное изменение размеров
        responsive: true, // Сделать график адаптивным
        scales: {
            y: {
                beginAtZero: true
            }}}
});
  
      // Заполнение таблицы данными статистики продаж
      const tableBody = salesDataTable.querySelector('tbody');
      salesData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name_journal}</td>
          <td>${item.количество_продаж}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching sales statistics', error);
    }
  });
  