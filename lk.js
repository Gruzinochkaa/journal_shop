document.addEventListener("DOMContentLoaded", function() {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        fetchUserData(loggedInUserEmail);
    }

    const updateButton = document.getElementById("update-info-btn");
    if (updateButton) {
        updateButton.addEventListener("click", function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение кнопки

            const email = localStorage.getItem("loggedInUserEmail");
            if (email) {
                fetchUserData(email);
            } else {
                console.error("Ошибка: Email пользователя не найден в локальном хранилище");
            }
        });
    }
});

function fetchUserData(email) {
    console.log("Отправка запроса на получение данных пользователя для email:", email);
    fetch("/userData/" + email)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }
            return response.json();
        })
        .then(data => {
            console.log("Получены данные пользователя:", data);
            fillUserData(data.userData);
        })
        .catch(error => {
            console.error("Произошла ошибка:", error.message);
        });
}

function fillUserData(userData) {
    document.getElementById("email").value = userData.email || "";
    document.getElementById("name").value = userData.name || "";
    document.getElementById("surname").value = userData.surname || "";
    document.getElementById("telephone").value = userData.telephone || "";
    document.getElementById("birthday").value = userData.birthday ? userData.birthday.split('T')[0] : "";
    document.getElementById("sex").value = userData.sex || "";
}

// Добавляем обработчик события для формы редактирования информации о пользователе
document.getElementById("user-profile-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const formData = new FormData(this);
    const userData = {};
    for (const [key, value] of formData.entries()) {
        userData[key] = value;
    }

    // Отправляем запрос на обновление данных о пользователе
    fetch("/updateProfile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }
        return response.json();
    })
    .then(data => {
        console.log("Данные пользователя успешно обновлены:", data);
        alert("Данные успешно обновлены");
        // Дополнительные действия после успешного обновления данных
    })
    .catch(error => {
        console.error("Произошла ошибка:", error.message);
        alert("Произошла ошибка при обновлении данных");
    });
});

// Функция для загрузки и отображения всех сделанных пользователем заказов
function loadUserOrders() {
    fetch('/user-orders')
    .then(response => response.json())
    .then(orders => {
        const ordersList = document.getElementById('orders-list');

        // Очищаем список заказов перед добавлением новых
        ordersList.innerHTML = '';

        // Перебираем полученные заказы и добавляем их в список
        orders.forEach(order => {
            const orderItem = document.createElement('li');
            orderItem.innerHTML = `
                <div><strong>Название журнала:</strong> ${order.name_journal}<br></div>
                <div><strong>Цена:</strong> ${order.price} руб.<br></div>
                <div><img src="${order.image}" alt="${order.name_journal}" width="150"><br></div>
                <div><strong>Идентификатор заказа:</strong> ${order.orderId}<br><br></div>
            `;
            ordersList.appendChild(orderItem);
        });
    })
    .catch(error => console.error('Ошибка загрузки данных о заказах:', error));
}

// Вызываем функцию загрузки заказов при загрузке страницы
window.onload = loadUserOrders;


