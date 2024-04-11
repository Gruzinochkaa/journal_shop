document.addEventListener("DOMContentLoaded", function() {
// При загрузке страницы отобразим все товары
let productsData = [];

fetch('/products')
    .then(response => response.json())
    .then(products => {
        productsData = products;
        renderProducts(productsData);
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Очищаем контейнер перед отрисовкой

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
        <img src="${product.image}" alt="${product.name_journal}">
            <h3>${product.name_journal}</h3>
            <p>Цена: ${product.price} руб.</p>
            <button class="button-filter" data-id="${product.id_journal}">Подробнее</button>
        `;
        productContainer.appendChild(card);
    });

    // Добавляем обработчики событий для кнопок "Подробнее"
    document.querySelectorAll('.button-filter').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            window.location.href = `/cart.html?id=${productId}`; // Переход на страницу cart.html с ID товара в URL
        });
    });
}

// Обработчик события изменения селектора сортировки
document.getElementById('sort').addEventListener('change', function(event) {
    const sortBy = event.target.value;
    if (sortBy === 'price_asc') {
        productsData.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
        productsData.sort((a, b) => b.price - a.price);
    }
    renderProducts(productsData);
});

// Обработчик события ввода текста в поле поиска
document.getElementById('search').addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = productsData.filter(product => 
        product.name_journal.toLowerCase().includes(searchText)
    );
    renderProducts(filteredProducts);
});

// Обработчик события клика на кнопку "Применить фильтры"
document.getElementById('apply-filters').addEventListener('click', function() {
    const categoryFilter = document.getElementById('category').value;
    const filteredProducts = productsData.filter(product => 
        categoryFilter === '' || product.name_genre === categoryFilter
    );
    renderProducts(filteredProducts);
});
});