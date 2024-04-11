// JavaScript-код для получения информации о товаре по его id
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`/product/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetails = document.getElementById('product-details');
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
        <div class="grid-container">
        <div style="justify-content: center; text-align: center">
            <img src="${product.image}" alt="${product.name_journal}" width=430px height=500px>
        </div>
        <div class="container-div">
            <h3>${product.name_journal}</h3>
            <div>Издатель: ${product.name_publishing}</div>
            <div>Жанр: ${product.name_genre}</div>
            <div>Количество страниц: ${product.pages}</div>
            <div>Год выпуска: ${product.year}</div>
            <div>Цена: ${product.price} руб.</div>        
            <div>Номер журнала: ${product.issue}</div>            
        </div>
</div>
    `;
        productDetails.appendChild(productCard);
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

// JavaScript-код для отправки запроса на сервер для добавления товара в корзину
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    fetch(`/add-to-cart/${productId}`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                alert('Товар успешно добавлен в корзину');
                window.location.href = `/busket.html`; // Переход на страницу busket.html с ID товара в URL
            } else {
                throw new Error('Ошибка при добавлении товара в корзину');
            }
        })
        .catch(error => console.error('Ошибка добавления товара в корзину:', error));
});
