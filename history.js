document.addEventListener('DOMContentLoaded', function() {
    fetch('/order-history')
        .then(response => response.json())
        .then(data => {
            const orderList = document.getElementById('order-list');
            const table = document.createElement('table');
            table.classList.add('order-table'); // Добавляем класс для стилизации таблицы
            data.forEach(order => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${order.id_order}</td>
                    <td>${order.date}</td>
                    <td>${order.status}</td>
                    <td>${order.all_price}</td>
                `;
            });
            orderList.appendChild(table);
        })
        .catch(error => {
            console.error('Ошибка загрузки истории заказов:', error);
        });
});
